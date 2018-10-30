/* global $ */

function changePageParam(param, request) {
    if (request.url.indexOf('page=') === -1) {
        return `${request.url}&${param}`;
    }
    return request.url.replace(/page=\d+/, param);
}

async function parsePaginationUrl(page, request) {
    let pageAttr = null;

    // try to wait for first known layout
    try {
        await page.waitForSelector('.pagnHy', { timeout: 10000 });
        pageAttr = await page.evaluate(() => {
            const nextLinkEle = $('a#pagnNextLink');
            if (nextLinkEle.length !== 0) {
                return nextLinkEle.attr('href').match(/page=\d+/)[0];
            }
            return false;
        });
    } catch (error) {
        // We are ignoring this error because there can be other layout
    }
    // First layout found and found link
    if (pageAttr) return changePageParam(pageAttr, request);
    // First layout found but there is not link
    if (pageAttr === false) return false;

    // try to wait for second known layout
    try {
        await page.waitForSelector('.a-pagination .a-last', { timeout: 2000 });
        pageAttr = await page.evaluate(() => {
            const paginationHrefEle = $('ul.a-pagination li.a-last:not(".a-disabled") a');
            if (paginationHrefEle.length !== 0) {
                return paginationHrefEle.attr('href').match(/page=\d+/)[0];
            }
            return false;
        });
    } catch (error) {
        console.log('no pagination or unknown layout of page');
    }

    if (pageAttr) return changePageParam(pageAttr, request);
    return false;
}

module.exports = parsePaginationUrl;
