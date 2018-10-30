const Apify = require('apify');
const SearchUrlsCreator = require('./SearchUrlsCreator');
const SellersDetailsParser = require('./SellersDetailsParser');
const ItemUrlsParser = require('./ItemUrlsParser');
const PaginationUrlsParser = require('./PaginationUrlParser');

Apify.main(async () => {
    // Get queue and enqueue first url.
    const requestQueue = await Apify.openRequestQueue();
    const input = await Apify.getValue('INPUT');

    const searchUrlsCreator = new SearchUrlsCreator();
    const sellerParser = new SellersDetailsParser();
    const itemsUrls = new ItemUrlsParser();
    const paginationUrl = new PaginationUrlsParser();

    //based on the input country and keywords, generate the search urls
    let urls = await searchUrlsCreator.run(input);

    for (let searchUrl of urls) {
        await requestQueue.addRequest(new Apify.Request({
            url: searchUrl.url,
            userData: {
                label: "page",
                keyword: searchUrl.keyword
            }
        }));
    }

    // Create crawler.
    const crawler = new Apify.PuppeteerCrawler({
        requestQueue,
        maxConcurrency: 10,
        maxOpenPagesPerInstance: 5,
        retireInstanceAfterRequestCount: 10,
        launchPuppeteerFunction: async () => Apify.launchPuppeteer({
            useApifyProxy: true,
            headless: true,
            userAgent: await Apify.utils.getRandomUserAgent(),
            liveView: true
        }),
        // This page is executed for each request.
        // If request failes then it's retried 3 times.
        // Parameter page is Puppeteers page object with loaded page.
        gotoFunction: async ({page, request}) => {
            await Apify.utils.puppeteer.hideWebDriver(page);

            await page.setRequestInterception(true);

            page.on('request', (request) => {
                const url = request.url();
                const ignored = [
                    '.js',
                    '.png',
                    '.gif',
                    '.css',
                    'static/fonts',
                    'js_tracking',
                    'facebook.com',
                    'googleapis.com',
                    'ibmcloud.com',
                    'omtrdc.net',
                    'demdex.net',
                    'go-mpulse.net',
                    'foresee.com',
                    'atgsvcs.com'
                ];

                const abort = ignored.some((item) => url.includes(item));

                if (abort) {
                    request.abort();
                } else {
                    request.continue();
                }
            });

            return page.goto(request.url);
        },
        handlePageFunction: async ({page, request}) => {
            //added delay not to crawl too fast
            await new Promise(resolve => setTimeout(resolve, Math.random(1000) + 1000));
            //add pagintion and items on the search
            if (request.userData.label === 'page') {
                await Apify.utils.puppeteer.injectJQuery(page);
                //solve pagination if on the page, now support two layouts
                let enqueuPagination = await paginationUrl.run(page, request);
                if (enqueuPagination !== false) {
                    console.log(`Adding new pagination of search ${enqueuPagination}`);
                    await requestQueue.addRequest(new Apify.Request({
                        url: enqueuPagination,
                        userData: {
                            label: "page",
                            keyword: request.userData.keyword
                        }
                    }));
                }
                //add items to the queue
                try {
                    await page.waitForSelector('.s-result-list [data-asin]', {timeout: 10000});
                    let items = await itemsUrls.run(page, request);
                    for (let item of items) {
                        await requestQueue.addRequest(new Apify.Request({
                            url: item.url,
                            userData: {
                                label: "seller",
                                keyword: request.userData.keyword,
                                asin: item.asin,
                                detailUrl: item.detailUrl,
                                sellerUrl: item.sellerUrl
                            }
                        }));
                    }
                } catch (error) {
                    await Apify.pushData({
                        "status": "No items for this keyword.",
                        "url": request.url,
                        "keyword": request.userData.keyword
                    });
                }
                //extract info about item and about seller offers
            } else if (request.userData.label === 'seller') {
                try {
                    await page.waitForSelector('.olpOfferList');
                    await Apify.utils.puppeteer.injectJQuery(page);
                    let item = await sellerParser.run(page, request);

                    let paginationUrl = await page.evaluate(() => {
                        if ($('ul.a-pagination li.a-last a').length !== 0) {
                            return window.location.origin + $('ul.a-pagination li.a-last a').attr("href")
                        } else {
                            return false;
                        }
                    });
                    //if there is a pagination, go to another page
                    if (paginationUrl !== false) {
                        console.log(`Seller detail has pagination, crawling that now -> ${paginationUrl}`)
                        await requestQueue.addRequest(new Apify.Request({
                            url: paginationUrl,
                            userData: {
                                label: "seller",
                                keyword: request.userData.keyword,
                                sellers: item.sellers
                            }
                        }));
                    } else {
                        console.log(`Saving item ${item.title}, url: ${request.url}`)
                        await Apify.pushData(item);
                    }
                } catch (error) {
                    console.log(error);
                    await Apify.pushData({
                        "status": "No sellers for this keyword.",
                        "keyword": request.userData.keyword
                    });
                }
            }
        },

        // If request failed 4 times then this function is executed.
        handleFailedRequestFunction: async ({request}) => {
            console.log(`Request ${request.url} failed 4 times`);
        },
    });

    // Run crawler.
    await crawler.run();
});
