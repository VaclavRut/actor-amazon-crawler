const Apify = require('apify');

const { log } = Apify.utils;

function getBaseUrl(country) {
    const baseUrls = {
        US: 'https://www.amazon.com/',
        GB: 'https://www.amazon.co.uk/',
        DE: 'https://www.amazon.de/',
        ES: 'https://www.amazon.es/',
        FR: 'https://www.amazon.fr/',
        IT: 'https://www.amazon.it/',
        IN: 'https://www.amazon.in/',
        CA: 'https://www.amazon.ca/',
        JP: 'https://www.amazon.co.jp/',
    };
    const url = baseUrls[country];
    if (!url) throw new Error('Selected country is not supported, contact us.');
    return url;
}

async function createSearchUrls(input) {
    let searchUrlBase;
    const urlsToProcess = [];

    if (!input.country) {
        throw new Error('Country required');
    }
    if ((!input.keywords) && (!input.asins && !input.asins.length) && (!input.directUrls && !input.directUrls.length)) {
        throw new Error('Keywords/Asins required');
    }

    if (input.asins) {
        for (const item of input.asins) {
            for (const country of item.countries) {
                searchUrlBase = getBaseUrl(country.toUpperCase());
                const sellerUrl = `${searchUrlBase}gp/offer-listing/${item.asin}`;
                urlsToProcess.push({
                    url: sellerUrl,
                    userData: {
                        label: 'seller',
                        asin: item.asin,
                        detailUrl: `${searchUrlBase}dp/${item.asin}`,
                        sellerUrl,
                        country: country.toUpperCase(),
                    },
                });
            }
        }
    }

    if (input.keywords) {
        searchUrlBase = getBaseUrl(input.country);
        if (input.keywords.length !== 0) {
            if (input.keywords.indexOf(',').length !== -1) {
                const keywords = input.keywords.split(',');
                for (const keyword of keywords) {
                    urlsToProcess.push({
                        url: `${searchUrlBase}s?k=${keyword.replace(/\s+/g, '+').trim()}`,
                        userData: {
                            label: 'page',
                            keyword,
                        },
                    });
                }
            } else {
                urlsToProcess.push({
                    url: `${searchUrlBase}s?k=${input.keywords.replace(/\s+/g, '+').trim()}`,
                    userData: {
                        label: 'page',
                        keyword: input.keywords,
                    },
                });
            }
        }
    }

    if (input.directUrls) {
        for (const request of input.directUrls) {
            urlsToProcess.push(request);
        }
    }

    if (urlsToProcess.length !== 0) {
        log.info(`Going to enqueue ${urlsToProcess.length} requests from input.`);
        return urlsToProcess;
    }

    throw new Error('Can\'t add any requests, check your input.');
}

module.exports = createSearchUrls;
