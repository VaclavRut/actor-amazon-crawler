const Apify = require('apify');

const { log } = Apify.utils;

function getCatPath(category) {
    return `&i=${category}`;
}

function getBaseUrl(country) {
    const baseUrls = {
        US: 'https://www.amazon.com/',
        UK: 'https://www.amazon.co.uk/',
        DE: 'https://www.amazon.de/',
        ES: 'https://www.amazon.es/',
        FR: 'https://www.amazon.fr/',
        IT: 'https://www.amazon.it/',
        IN: 'https://www.amazon.in/',
        CA: 'https://www.amazon.ca/',
        JP: 'https://www.amazon.co.jp/',
        AE: 'https://www.amazon.ae/',
        SA: 'https://www.amazon.sa/',
        BR: 'https://www.amazon.com.br/',
        MX: 'https://www.amazon.com.mx/',
        SG: 'https://www.amazon.sg/',
        TR: 'https://www.amazon.com.tr/',
        NL: 'https://www.amazon.nl/',
        AU: 'https://www.amazon.com.au/',
        SE: 'https://www.amazon.se/',
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
    if ((!input.keywords) && (!input.asins) && (!input.directUrls) && (!input.search)) {
        throw new Error('Keywords/Asins required');
    }
    if (!input.searchType) {
        throw new Error('SearchType required');
    }
    if (input.searchType === 'asins') {
        try {
            try {
                for (const item of JSON.parse(input.search)) {
                    for (const country of item.countries) {
                        searchUrlBase = getBaseUrl(country.toUpperCase());
                        const reviewsUrl = `${searchUrlBase}product-reviews/${item.asin}`;
                        const sellerUrl = `${searchUrlBase}gp/offer-listing/${item.asin}`;
                        const detailUrl = `${searchUrlBase}dp/${item.asin}`;
                        urlsToProcess.push({
                            url: detailUrl,
                            userData: {
                                label: 'detail',
                                asin: item.asin,
                                detailUrl,
                                sellerUrl,
                                reviewsUrl,
                                country: country.toUpperCase(),
                                domain: searchUrlBase
                            },
                        });
                    }
                }
            } catch (e) {
                for (const asin of input.search.split(',')) {
                    const searchUrlBase = getBaseUrl(input.country);
                    const reviewsUrl = `${searchUrlBase}product-reviews/${asin}`;
                    const sellerUrl = `${searchUrlBase}gp/offer-listing/${asin}`;
                    const detailUrl = `${searchUrlBase}dp/${asin}`;
                    urlsToProcess.push({
                        url: detailUrl,
                        userData: {
                            label: 'detail',
                            asin: asin,
                            detailUrl,
                            sellerUrl,
                            reviewsUrl,
                            country: input.country,
                            domain: searchUrlBase
                        },
                    });
                }
            }
        } catch (e) {

        }
    }

    if (input.searchType === "keywords") {
        try {
            searchUrlBase = getBaseUrl(input.country);
            const cat = input.country.toUpperCase() == 'US' ? getCatPath(input.category) : ``;
            if (input.search.length !== 0) {
                if (input.search.indexOf(',').length !== -1) {
                    const keywords = input.search.split(',');
                    for (const keyword of keywords) {
                        urlsToProcess.push({
                            url: `${searchUrlBase}s?k=${keyword.replace(/\s+/g, '+').trim()}&i=${cat}&ref=nb_sb_noss`,
                            userData: {
                                label: 'page',
                                keyword,
                                domain: searchUrlBase
                            },
                        });
                    }
                } else {
                    urlsToProcess.push({
                        url: `${searchUrlBase}s?k=${input.search.replace(/\s+/g, '+').trim()}`,
                        userData: {
                            label: 'page',
                            keyword: input.search,
                            domain: searchUrlBase
                        },
                    });
                }
            }
        } catch (e) {

        }
    }

    if (input.searchType === "directUrls" ) {
        try {
            try {
                const directSearchUrl = JSON.parse(input.search)
                for (const request of directSearchUrl) {
                    request.userData.domain = getBaseUrl(input.country);
                    urlsToProcess.push(request);
                }
            } catch (e) {
                const directSearchUrl =  input.search;
                for (const url of directSearchUrl.split(","))   {
                    const request = {
                        url: url,
                        userData:{
                            // label: url.includes('/s?k=') ? 'page' : 'detail',
                            label: 'page',
                            domain: url.split('/').splice(0,3).filter(el => el!== "").join('//'),
                            // keyword: url.split('s?k=').pop().split('&')[0].replace('+',' ')
                        }
                    };
                    urlsToProcess.push(request)
                }
            }
        } catch (e) {

        }

    }
    //Handle older schema
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
