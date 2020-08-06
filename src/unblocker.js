const Apify = require('apify');

const { utils } = Apify;
const { log, requestAsBrowser, puppeteer: { addInterceptRequestHandler } } = utils;

class CloudFlareUnBlocker {
    /**
     * We could generalize this class to make it bypass possible for every blocking service that use mitigation on same principle.
     * TODO: header randomization, abstraction.
     * @param options
     */
    constructor(options) {
        this.name = 'UNBLOCKER';
        this.detectChallengeFunction = options.detectChallengeFunction || this._defaultDetectChallengeFunction;
        this.getDeliveryCountryCookieRequest = options.getDeliveryCountryCookieRequest || this._getDeliveryCountryCookieRequest;
        this.poroxyConfiguration = options.poroxyConfiguration;
        this.apifyProxyGroups = options.proxyConfiguration.apifyProxyGroups;
        this.detectChallengeRequestFunction = options.detectChallengeRequestFunction || this._defaultDetectChallengeRequestFunction;
        this.waitUntilChallengeFinishedFunction = options.waitUntilChallengeFinishedFunction || this._defaultWaitUntilChallengeFinishedFunction;
        this.isChallengeSolvedFunction = options.waitUntilChallengeFinishedFunction || this._defaultIsChallengeSolvedFunction;

        this.puppeteerPool = new Apify.PuppeteerPool({
            useIncognitoPages: true,
            launchPuppeteerOptions: { useChrome: true, headless: false },
            retireInstanceAfterRequestCount: 50,
            maxOpenPagesPerInstance: 10,
        });

        this._shouldUseCustomTLS = false;
    }

    /**
     * Main function that unblocks your session.
     * @param options.session
     * @param options.request
     * @return {Promise<*|undefined>}
     */
    async unblock(options) {
        const { session, request } = options;
        if (this._isSessionBeingRenewed(session)) {
            request.retryCount = 0;
            this._throwError('Session is being renewed');
        }

        const proxyUrl = this._getProxyUrl(session);
        // this._log(proxyUrl);
        const cookieString = session.getCookieString(request.url) ;

        const requestOptions = {
            headers: this._getBrowserHeaders(cookieString),
            proxyUrl,
            followRedirect: true,
        };

        if (this._shouldUseCustomTLS) {
            requestOptions.ciphers = 'AES256-SHA';
        }

        const response = await requestAsBrowser({
            ...requestOptions,
            url: request.url,
        });

        if (this.detectChallengeFunction(response)) {
            // Is cloudflare check;
            try {
                this._markSessionBeingRenewed(session);
                return this._solveChallenge({ response, session, request, requestOptions });
            } catch (e) {
                throw e;
            } finally {
                this._markSessionNotBeingRenewed(session);
            }
        } else if (response.statusCode === 403) {
            // captcha
            if (this._shouldUseCustomTLS) {
                this._log('Captcha found even the TLS hack');
                await Apify.setValue(`CAPTCHA-HTML-${Math.random() * 1000}`, response.body, { contentType: 'text/html' });
            } else {
                this._log('Captcha found for the first time -> switching to custom TLS');
                this._shouldUseCustomTLS = true;
            }
            this._throwError('Captcha');
        }

        // this._log('Session OK');
        // update cookies;
        session.setCookiesFromResponse(response);
        return response;
    }

    /**
     * Solves the challenge by starting the browser and saving the cookies to the session.
     * @param options
     * @param options.request
     * @param options.response
     * @param options.session
     * @param options.requestOptions
     * @return {Promise<*>}
     * @private
     */
    async _solveChallenge(options) {
        const { request, response, session, requestOptions } = options;
        const { body, headers } = response;

        const recievedCookies = headers['set-cookie'];
        this._log(`recieved cookies: ${recievedCookies}`);

        if (!recievedCookies) {
            await Apify.setValue(`NO-COOKIES-HTML-${Math.random() * 1000}`, body, { contentType: 'text/html' });
        }
        const cookie = recievedCookies ? recievedCookies[0].split(';')[0] : session.getCookieString(request.url);
        const cloudflareAuthReq = await this._getSolvedChallengeRequest({ response, session, request });
        const browserHeaders = cloudflareAuthReq.headers();
        const finalRequestOpts = {
            ...requestOptions,
            url: cloudflareAuthReq.url(),
            payload: cloudflareAuthReq.postData(),
            headers: {
                ...requestOptions.headers,
                'Content-Type': browserHeaders['content-type'],
                Origin: browserHeaders.origin,
                Referer: browserHeaders.referer,
                Cookie: cookie,
                'Content-Length': cloudflareAuthReq.postData().length,

            },
            method: 'POST',
        };
        const response2 = await requestAsBrowser(finalRequestOpts);

        if (this.isChallengeSolvedFunction(response2)) {
            request.retryCount = 0;
            session.setCookiesFromResponse(response2);
            this._log('Succesfully unblocked');
            return response2;
        }
        session.retire();
        await Apify.setValue(`BLOCKED-HTML-${response2.statusCode}-${Math.random() * 1000}`, response2.body, { contentType: 'text/html' });
        this._throwError('BLOCKED');
    }

    /**
     * Locks session
     * @ODO: we could add this function to the Session natively
     * @param session {Session}
     * @private
     */
    _markSessionBeingRenewed(session) {
        session.userData.isBeingRenewed = true;
    }

    /**
     * Unlocks session
     * @param session {Session}
     * @private
     */
    _markSessionNotBeingRenewed(session) {
        session.userData.isBeingRenewed = false;
    }

    // TODO: COUNTRY
    /**
     * Gets proxy URL
     * @param session {Session};
     * @return {String}
     * @private
     */
    _getProxyUrl(session) {
        return Apify.getApifyProxyUrl({
            groups: this.apifyProxyGroups,
            session: session.id,
        });
    }

    _log(msg) {
        log.info(`${this.name}: ${msg}`);
    }

    /**
     *
     * @param session {Session}
     * @return {boolean}
     * @private
     */
    _isSessionBeingRenewed(session) {
        return session.userData.isBeingRenewed;
    }

    /**
     *
     * @param msg {String}
     * @private
     */
    _throwError(msg) {
        throw new Error(`${this.name}: ${msg}`);
    }

    /**
     * Opens new page, where solves the challenge and returns the auth request details.
     * @param response
     * @param request - Puppeteer request object
     * @return {Promise<Object>} - Auth request
     * @private
     */
    async _getSolvedChallengeRequest({ response, request }) {
        const { headers, body } = response;
        const page = await this.puppeteerPool.newPage();
        let authRequest;


        await addInterceptRequestHandler(page, (req) => {
            const reqUrl = req.url();
            const method = req.method();

            if (request.url === reqUrl && method === 'GET') {
                this._log(`Mocking initial navigation request: ${req.url()}`);
                req.respond({ status: 200, body, headers });
            } else if (this.detectChallengeRequestFunction(req)) {
                authRequest = req;
                req.abort();
            } else {
                req.continue();
            }
        });


        page.on('console', msg => this._log(msg.text()));
        await page.evaluate((url) => {
            window.location.href = url;
        }, request.url);
        await this.waitUntilChallengeFinishedFunction({ page, request });
        this.puppeteerPool.recyclePage(page).catch();
        return authRequest;
    }

    /**
     * Opens new page, sets up delivery country and returns the request details
     * @param response
     * @param request - Puppeteer request object
     * @return {Promise<Object>} - Auth request
     * @private
     */
    async _getDeliveryCountryCookieRequest({request, session}) {
        const page = await this.puppeteerPool.newPage();
        const cookies = await page.cookieJar();
        console.log(cookies)
        console.log(session)
    }

    /**
     * Gets the browser headers;
     * TODO: We should randomize the headers
     * @param cookieString
     * @return {{Cookie: *, "Cache-Control": string, Accept: string, "Upgrade-Insecure-Requests": string, Connection: string, "User-Agent": string, "Sec-Fetch-Site": string, "Sec-Fetch-User": string, Pragma: string, "Accept-Encoding": string, "Accept-Language": string, "Sec-Fetch-Mode": string}}
     * @private
     */
    _getBrowserHeaders(cookieString) {
        return {
            Connection: 'keep-alive',
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
            'Sec-Fetch-User': '?1',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            Cookie: cookieString,
        };
    }

    /**
     * Detects the Cloudflare challenge page by 503 status code and the CDATA tag;
     * @param response
     * @return {boolean}
     * @private
     */
    _defaultDetectChallengeFunction(response) {
        return response.statusCode === 503 && response.body.includes('CDATA');
    }

    _defaultDetectChallengeRequestFunction(request) {
        return request.method() === 'POST';
    }


    async _defaultWaitUntilChallengeFinishedFunction(options) {
        await Apify.utils.sleep(5000);
    }

    _defaultIsChallengeSolvedFunction(challengeResponse) {
        return challengeResponse.statusCode === 200;
    }

    async _bypassCaptchaTLS({}) {

    }
}

module.exports = CloudFlareUnBlocker;
