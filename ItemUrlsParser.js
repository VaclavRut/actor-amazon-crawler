// The comment below makes sure that eslint ignores variables from inside
// of the webpage (eq. $ for jQuery and window)
/* global $, window */
function extractSellers(page) {
    return page.evaluate(() => {
        const itemUrls = [];
        const items = $('.s-result-list [data-asin]');
        if (items.length !== 0) {
            items.each(function () {
                const asin = $(this).attr("data-asin");
                const sellerUrl = window.location.origin + "/gp/offer-listing/" + asin;
                itemUrls.push({
                    url: sellerUrl,
                    asin,
                    detailUrl: window.location.origin + "/dp/" + asin,
                    sellerUrl,
                });
            });
        }
        return itemUrls;
    });
}

async function parseItemUrls(page) {
    const urls = await extractSellers(page);
    console.log("We have items -> " + urls.length);
    return urls;
}

module.exports = parseItemUrls;
