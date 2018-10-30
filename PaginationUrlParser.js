class PaginationUrlParser {
    async run(page,request) {
        let pageAttr = null;

        //try to wait for first known layout
        try{
            await page.waitForSelector('.pagnHy',{timeout: 10000});
            let pageAttr = await page.evaluate(() => {
                if($('a#pagnNextLink').length !== 0){
                    let pageAttr = $('a#pagnNextLink').attr("href").match(/page\=\d+/)[0];
                    return pageAttr;
                }else{
                    return false;
                }
            });
        } catch (error) {
            // We are ignoring this error because there can be other layout
        }
        // First layout found and found link
        if (pageAttr) return this.changePageParam(pageAttr,request);
        // First layout found but there is not link
        else if (pageAttr === false) return false;

        //try to wait for second known layout
        try {
            await page.waitForSelector('.a-pagination .a-last',{timeout: 2000});
            pageAttr = await page.evaluate(() => {
                if($('ul.a-pagination li.a-last:not(".a-disabled") a').length !== 0){
                    return pageAttr = $('ul.a-pagination li.a-last:not(".a-disabled") a').attr("href").match(/page\=\d+/)[0];
                }else{
                    return false;
                }
            });
        } catch (error) {
            console.log("no pagination or unknown layout of page")
        }

        if (pageAttr) return this.changePageParam(pageAttr,request);
        return false;
    }

    changePageParam(param, request){
        if (request.url.indexOf("page=") === -1){
            return request.url + "&" + param
        }else{
            return request.url.replace(/page=\d+/,param)
        }
    }
}

module.exports = PaginationUrlParser;
