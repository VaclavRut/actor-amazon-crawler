const Apify = require('apify');

async function parseItemDetail($, request, requestQueue) {
    const { sellerUrl, asin, detailUrl } = request.userData;
    const item = {};
    const reviewsConunt = $('#acrCustomerReviewText').length !== 0 ? $('#acrCustomerReviewText').eq(0).text() : null;
    const stars = $('.reviewCountTextLinkedHistogram').length !== 0 ? $('.reviewCountTextLinkedHistogram').attr('title').match(/(\d+\.\d+)|\d+/)[0] : null;
    const details = {};
    $('table.prodDetTable tr').each(function () {
        details[$(this).find('th').text().trim()] = $(this).find('td').text().trim();
    });
    item.featureDesc = $('#featurebullets_feature_div').length !== 0 ? $('#featurebullets_feature_div').text().trim() : null;
    item.desc = $('#productDescription').length !== 0 ? $('#productDescription').text().trim() : null;
    item.reviewsCount = reviewsConunt;
    item.stars = stars;
    item.details = details;

    await requestQueue.addRequest({
        url: sellerUrl,
        userData: {
            asin,
            detailUrl,
            sellerUrl,
            itemDetail: item,
            label: 'seller',
        },
    });
}

module.exports = parseItemDetail;
