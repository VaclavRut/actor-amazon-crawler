/* global $, window */
const Apify = require('apify');
const SearchUrlsCreator = require('./SearchUrlsCreator');
const SellersDetailsParser = require('./SellersDetailsParser');
const parseItemUrls = require('./ItemUrlsParser');
const PaginationUrlsParser = require('./PaginationUrlParser');

Apify.main(async () => {
    // Get queue and enqueue first url.
    const requestQueue = await Apify.openRequestQueue();
    const input = await Apify.getValue('INPUT');

    // based on the input country and keywords, generate the search urls
    const urls = await SearchUrlsCreator(input);

    for (const searchUrl of urls) {
        await requestQueue.addRequest({
            url: searchUrl.url,
            userData: {
                label: 'page',
                keyword: searchUrl.keyword,
            },
        });
    }

    // Create crawler.
    const crawler = new Apify.PuppeteerCrawler({
        requestQueue,
        maxOpenPagesPerInstance: 5,
        retireInstanceAfterRequestCount: 10,
        launchPuppeteerFunction: async () => Apify.launchPuppeteer({
            useApifyProxy: true,
            headless: true,
            userAgent: await Apify.utils.getRandomUserAgent(),
            liveView: input.liveView ? input.liveView : true,
        }),
        // This page is executed for each request.
        // If request fails then it's retried 3 times.
        // Parameter page is Puppeteers page object with loaded page.
        gotoFunction: async ({ page, request }) => {
            await Apify.utils.puppeteer.hideWebDriver(page);

            await page.setRequestInterception(true);

            page.on('request', (req) => {
                const url = req.url();
                const resourceType = req.resourceType();
                const ignoredTypes = [
                    'stylesheet',
                    'image',
                    'media',
                    'font',
                    'script',
                    'texttrack',
                    'xhr',
                    'fetch',
                    'eventsource',
                    'websocket',
                    'manifest',
                    'other',
                ];

                const ignored = [
                    'js_tracking',
                    'facebook.com',
                    'googleapis.com',
                    'ibmcloud.com',
                    'omtrdc.net',
                    'demdex.net',
                    'go-mpulse.net',
                    'foresee.com',
                    'atgsvcs.com',
                ];

                let abort = ignoredTypes.includes(resourceType);
                if (!abort) abort = ignored.some((item) => url.includes(item));

                if (abort) {
                    req.abort();
                } else {
                    req.continue();
                }
            });

            return page.goto(request.url);
        },
        handlePageFunction: async ({ page, request }) => {
            await Apify.utils.puppeteer.injectJQuery(page);
            // added delay not to crawl too fast
            await page.waitFor(Math.floor(Math.random() * 5000) + 1000);
            // add pagintion and items on the search
            if (request.userData.label === 'page') {
                // solve pagination if on the page, now support two layouts
                const enqueuPagination = await PaginationUrlsParser(page, request);
                if (enqueuPagination !== false) {
                    console.log(`Adding new pagination of search ${enqueuPagination}`);
                    await requestQueue.addRequest({
                        url: enqueuPagination,
                        userData: {
                            label: 'page',
                            keyword: request.userData.keyword,
                        },
                    });
                }
                // add items to the queue
                try {
                    await page.waitForSelector('.s-result-list [data-asin]', { timeout: 10000 });
                    const items = await parseItemUrls(page, request);
                    for (const item of items) {
                        await requestQueue.addRequest({
                            url: item.url,
                            userData: {
                                label: 'seller',
                                keyword: request.userData.keyword,
                                asin: item.asin,
                                detailUrl: item.detailUrl,
                                sellerUrl: item.sellerUrl,
                            },
                        });
                    }
                } catch (error) {
                    await Apify.pushData({
                        status: 'No items for this keyword.',
                        url: request.url,
                        keyword: request.userData.keyword,
                    });
                }
                // extract info about item and about seller offers
            } else if (request.userData.label === 'seller') {
                try {
                    await page.waitForSelector('.olpOfferList');
                    const item = await SellersDetailsParser(page, request);

                    const paginationUrlSeller = await page.evaluate(() => {
                        const paginationEle = $('ul.a-pagination li.a-last a');
                        if (paginationEle.length !== 0) {
                            return window.location.origin + paginationEle.attr('href');
                        }
                        return false;
                    });

                    // if there is a pagination, go to another page
                    if (paginationUrlSeller !== false) {
                        console.log(`Seller detail has pagination, crawling that now -> ${paginationUrlSeller}`);
                        await requestQueue.addRequest({
                            url: paginationUrlSeller,
                            userData: {
                                label: 'seller',
                                keyword: request.userData.keyword,
                                sellers: item.sellers,
                            },
                        });
                    } else {
                        console.log(`Saving item ${item.title}, url: ${request.url}`);
                        await Apify.pushData(item);
                    }
                } catch (error) {
                    console.log(error);
                    await Apify.pushData({
                        status: 'No sellers for this keyword.',
                        keyword: request.userData.keyword,
                    });
                }
            }
        },

        // If request failed 4 times then this function is executed.
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed 4 times`);
        },
    });

    // Run crawler.
    await crawler.run();
});
