// The comment below makes sure that eslint ignores variables from inside
// of the webpage (eq. $ for jQuery and window)
/* global $ */
const { getOriginUrl } = require('./utils');

async function extractSellers($, request) {
    const originUrl = await getOriginUrl(request)
    const itemUrls = [];
    const items = $('.s-result-list [data-asin]');
    if (items.length !== 0) {
        items.each(function () {
            const asin = $(this).attr('data-asin');
            const sellerUrl = `${originUrl}/gp/offer-listing/${asin}`;
            itemUrls.push({
                url: sellerUrl,
                asin,
                detailUrl: `${originUrl}/dp/${asin}`,
                sellerUrl,
            });
        });
    }
    return itemUrls;
}

async function parseItemUrls($,request) {
    const urls = await extractSellers($,request);
    console.log(`Found ${urls.length} on a site, going to crawl them.`);
    return urls;
}

module.exports = parseItemUrls;
