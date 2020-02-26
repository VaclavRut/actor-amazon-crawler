/* global $, window */
const Apify = require('apify');
const createSearchUrls = require('./createSearchUrls');
const parseSellerDetail = require('./parseSellerDetail');
const parseItemUrls = require('./parseItemUrls');
const parsePaginationUrl = require('./parsePaginationUrl');
const { saveItem, getOriginUrl } = require('./utils');

// TODO: Add an option to limit number of results for each keyword
Apify.main(async () => {
    // Get queue and enqueue first url.
    const requestQueue = await Apify.openRequestQueue();
    const input = await Apify.getValue('INPUT');
    const env = await Apify.getEnv();
    // based on the input country and keywords, generate the search urls
    const urls = await createSearchUrls(input);
    for (const searchUrl of urls) {
        console.log(searchUrl.url);
        await requestQueue.addRequest(searchUrl);
    }

    // Create crawler.
    const crawler = new Apify.CheerioCrawler({
        requestQueue,
        useSessionPool: true,
        sessionPoolOptions: {
            maxPoolSize: 100,
        },
        maxConcurrency: input.maxConcurrency || 40,
        maxRequestsPerCrawl: input.maxRequestsPerCrawl || null,
        ...input.proxyConfiguration,
        handlePageTimeoutSecs: 2.5 * 60,
        handlePageFunction: async ({ $, request, response, session }) => {
            // to handle blocked requests
            const title = $('title').length !== 0 ? $('title').text().trim() : '';
            const { statusCode } = response;
            if (statusCode !== 200
                || title.includes('Robot Check')
                || title.includes('CAPTCHA')
                || title.includes('Toutes nos excuses')
                || title.includes('Tut uns Leid!')
                || title.includes('Service Unavailable Error')) {
                session.retire();
            }

            const urlOrigin = await getOriginUrl(request);
            // add pagination and items on the search
            if (request.userData.label === 'page') {
                // solve pagination if on the page, now support two layouts
                const enqueuePagination = await parsePaginationUrl($, request);
                if (enqueuePagination !== false) {
                    console.log(`Adding new pagination of search ${enqueuePagination}`);
                    await requestQueue.addRequest({
                        url: enqueuePagination,
                        userData: {
                            label: 'page',
                            keyword: request.userData.keyword,
                        },
                    });
                }
                // add items to the queue
                try {
                    const items = await parseItemUrls($, request);
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
                        }, { forefront: true });
                    }

                    if (items.length === 0) {
                        await Apify.pushData({
                            status: 'No items for this keyword.',
                            url: request.url,
                            keyword: request.userData.keyword,
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
                    const item = await parseSellerDetail($, request);
                    if (item) {
                        let paginationUrlSeller;
                        const paginationEle = $('ul.a-pagination li.a-last a');
                        if (paginationEle.length !== 0) {
                            paginationUrlSeller = urlOrigin + paginationEle.attr('href');
                        } else {
                            paginationUrlSeller = false;
                        }

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
                            }, { forefront: true });
                        } else {
                            console.log(`Saving item url: ${request.url}`);
                            await saveItem('RESULT', request, item, input, env.defaultDatasetId);
                            // await Apify.pushData(item);
                        }
                    }
                } catch (error) {
                    console.error(error);
                    await saveItem('NORESULT', request, null, input, env.defaultDatasetId);
                }
            }
        },

        // If request failed 4 times then this function is executed.
        handleFailedRequestFunction: async ({ request }) => {
            await Apify.pushData({
                status: 'Page failed 4 times, check it out, what happened.',
                url: request.url,
                keyword: request.userData.keyword,
            });
            console.log(`Request ${request.url} failed 4 times`);
        },
    });

    // Run crawler.
    await crawler.run();
});
