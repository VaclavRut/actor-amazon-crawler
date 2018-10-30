/* global $ */
function extractInfo(page) {
    return page.evaluate(() => {
        const h1 = $('h1');
        const images = $('div#olpProductImage img');
        return {
            title: h1.length !== 0 ? h1.text().trim() : 'no item title',
            image: images.length !== 0 ? images.attr('src').replace('_SS160_.', '') : 'no image',
        };
    });
}

function extractSellers(page) {
    return page.evaluate(() => {
        const sellers = [];

        $('div.olpOffer').each(function () {
            const priceElem = $(this).find('span.olpOfferPrice');
            const sellerNameEle = $(this).find('h3.olpSellerName img');
            const price = priceElem.length !== 0 ? priceElem.text().trim() : 'price not displayed';
            let shippingInfo;
            let condition;
            const sellerName = sellerNameEle.length !== 0 ? sellerNameEle.attr('alt') : $(this).find('h3.olpSellerName').text().trim();

            let prime = false;
            if ($(this).find("a:contains('Fulfillment by Amazon')").length !== 0) {
                prime = true;
            } else if (sellerName === 'Amazon.com') {
                prime = true;
            }
            const offerConditionEle = $(this).find('div#offerCondition');
            const olpConditionEle = $(this).find('span.olpCondition');

            if (offerConditionEle.length !== 0) {
                condition = offerConditionEle.text().replace(/\s\s+/g, ' ').trim();
            } else if (olpConditionEle.length !== 0) {
                condition = olpConditionEle.text().replace(/\s\s+/g, ' ').trim();
            } else {
                condition = 'condition unknown';
            }

            const olpShippingInfoEle = $(this).find('p.olpShippingInfo ');
            if (olpShippingInfoEle.length !== 0) {
                shippingInfo = olpShippingInfoEle.text().replace(/\s\s+/g, ' ').trim();
            } else if ($("div.olpPriceColumn:contains('FREE Shipping')").length !== 0) {
                shippingInfo = '& eligible for FREE Shipping';
            } else {
                shippingInfo = 'shipping info not included';
            }

            sellers.push({
                price,
                condition,
                sellerName,
                prime,
                shippingInfo,
            });
        });
        return sellers;
    });
}


// to in a way to make sense what they are doing, so this one should be
// called parseSellerDetails
async function parseSellerDetail(page, request) {
    const sellers = await extractSellers(page);
    const item = await extractInfo(page);

    if (request.userData.sellers) {
        item.sellers = request.userData.sellers.concat(sellers);
    } else {
        item.sellers = sellers;
    }
    const { keyword, asin, detailUrl, sellerUrl } = request.userData;
    item.keyword = keyword;
    item.asin = asin;
    item.itemDetailUrl = detailUrl;
    item.sellerUrl = sellerUrl;
    return item;
}

module.exports = parseSellerDetail;
