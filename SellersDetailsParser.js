class SellersDetailsParser {

    async run(page, request) {
        const sellers = await this.extractSellers(page);
        let item = await this.extractInfo(page);

        if (request.userData.sellers) {
            item.sellers = request.userData.sellers.concat(sellers);
        } else {
            item.sellers =  sellers;
        }
        item.keyword = request.userData.keyword;
        item.asin = request.userData.asin;
        item.itemDetailUrl = request.userData.detailUrl;
        item.sellerUrl = request.userData.sellerUrl;
        return item;
    }

    extractInfo(page){
        return page.evaluate(() => {
            return {
                title: $("h1").length !== 0 ? $("h1").text().trim() : "no item title",
                image: $('div#olpProductImage img').length !== 0? $('div#olpProductImage img').attr("src").replace("_SS160_.","") : "no image"
            }
        })

    }


    extractSellers(page) {
        return page.evaluate(() => {
            let sellers = [];

            $('div.olpOffer').each(function () {
                let price = $(this).find("span.olpOfferPrice").length !== 0 ? $(this).find("span.olpOfferPrice").text().trim() : "price not displayed";
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
