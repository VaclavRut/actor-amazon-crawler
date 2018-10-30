class SellersDetailsParser {
    async run(page, request) {
        const sellers = await this.extractSellers(page);
        const item = await this.extractInfo(page);

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

    extractInfo(page){
        return page.evaluate(() => {
            const h1 = $("h1");
            const images = $('div#olpProductImage img');
            return {
                title: h1.length !== 0 ? h1.text().trim() : "no item title",
                image: images.length !== 0? images.attr("src").replace("_SS160_.","") : "no image"
            }
        });
    }

    extractSellers(page) {
        return page.evaluate(() => {
            let sellers = [];

            $('div.olpOffer').each(function () {
                const priceElem = $(this).find("span.olpOfferPrice");
                const price = priceElem.length !== 0 ? priceElem.text().trim() : "price not displayed";
                let shippingInfo;
                let condition;
                let sellerName = $(this).find("h3.olpSellerName img").length !== 0 ? $(this).find("h3.olpSellerName img").attr("alt") : $(this).find("h3.olpSellerName").text().trim();
                let prime = false
                if ($(this).find("a:contains('Fulfillment by Amazon')").length !== 0) {
                    prime = true;
                } else if (sellerName === "Amazon.com") {
                    prime = true;
                }

                if($(this).find("div#offerCondition").length !== 0){
                    condition = $(this).find("div#offerCondition").text().replace(/\s\s+/g, ' ').trim()
                }else if($(this).find('span.olpCondition').length !== 0){
                    condition = $(this).find('span.olpCondition').text().replace(/\s\s+/g, ' ').trim()
                }else{
                    condition = "condition unknown"
                }

                if($(this).find("p.olpShippingInfo ").length !== 0){
                    shippingInfo = $(this).find("p.olpShippingInfo").text().replace(/\s\s+/g, ' ').trim()
                }else if($("div.olpPriceColumn:contains('FREE Shipping')").length !== 0){
                    shippingInfo = "& eligible for FREE Shipping"
                }else{
                    shippingInfo = "shipping info not included"
                }

                sellers.push({
                    price: price,
                    condition: condition,
                    sellerName: sellerName,
                    prime: prime,
                    shippingInfo: shippingInfo
                })
            });
            return sellers;
        })
    }
}

module.exports = SellersDetailsParser
