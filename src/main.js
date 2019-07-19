/* global $, window */
const Apify = require('apify');
const createSearchUrls = require('./createSearchUrls');
const parseSellerDetail = require('./parseSellerDetail');
const parseItemUrls = require('./parseItemUrls');
const parsePaginationUrl = require('./parsePaginationUrl');
const { saveItem, getOriginUrl } = require('./utils');
const SessionsCheerioCrawler = require('./crawler');

// TODO: Add an option to limit number of results for each keyword
Apify.main(async () => {
    // Get queue and enqueue first url.
    const requestQueue = await Apify.openRequestQueue();
    const input = await Apify.getValue('INPUT');
    const env = await Apify.getEnv();
    // based on the input country and keywords, generate the search urls
    const urls = await createSearchUrls(input);

    for (const searchUrl of urls) {
        await requestQueue.addRequest({
            url: searchUrl.url,
            userData: {
                label: 'page',
                keyword: searchUrl.keyword,
            },
        });
    }

    const config = {
        maxConcurrency: input.maxConcurrency || 40,
        maxRequestsPerCrawl: input.maxRequestsPerCrawl || null,
        retireInstanceAfterRequestCount: 80,
        useApifyProxy: true,
        maxRequestRetries: 6,
        handlePageTimeoutSecs: 2.5 * 60 * 1000,
        liveView: input.liveView ? input.liveView : true,
        autoscaledPoolOptions: {
            systemStatusOptions: {
                maxEventLoopOverloadedRatio: 0.65,
                maxCpuOverloadedRatio: 0.4,
                maxClientOverloadedRatio: 0.3,
            },
        },
    };

    // Create crawler.
    const crawler = new SessionsCheerioCrawler({
        requestQueue,
        ...config,
        maxOpenPagesPerInstance: 5,
        retireInstanceAfterRequestCount: 5,
        handlePageFunction: async ({ $, html, request }) => {
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

                    let paginationUrlSeller;
                    const paginationEle = $('ul.a-pagination li.a-last a');
                    if (paginationEle.length !== 0) {
                        paginationUrlSeller = urlOrigin + paginationEle.attr('href');
                    }else {
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
                        console.log(`Saving item ${item.title}, url: ${request.url}`);
                        await saveItem('RESULT', request, item, input, env.defaultDatasetId);
                        // await Apify.pushData(item);
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
