class ItemUrlsParser {

    async run(page) {
        let urls = await this.extractSellers(page);
        console.log("We have items -> " + urls.length);
        return urls;
    }
    extractSellers(page) {
        return page.evaluate(() => {
            let itemUrls = [];
            if($('.s-result-list [data-asin]').length !== 0){
                $('.s-result-list [data-asin]').each(function(){
                    let sellerUrl = window.location.origin + "/gp/offer-listing/" + $(this).attr("data-asin");
                    itemUrls.push({
                        url:sellerUrl,
                        asin: $(this).attr("data-asin"),
                        detailUrl: window.location.origin + "/dp/" + $(this).attr("data-asin"),
                        sellerUrl:sellerUrl
                    });
                });
            }
            return itemUrls;
        });
    }

}

module.exports = ItemUrlsParser;
