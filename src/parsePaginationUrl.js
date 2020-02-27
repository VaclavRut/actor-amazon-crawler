/* global $ */
const Apify = require('apify');

const { log } = Apify.utils;
function changePageParam(param, request) {
    if (request.url.indexOf('page=') === -1) {
        return `${request.url}&${param}`;
    }
    return request.url.replace(/page=\d+/, param);
}

async function parsePaginationUrl($, request) {
    let pageAttr = null;

    // try to wait for first known layout
    try {
        if ($('.pagnHy').length !== 0) {
            const nextLinkEle = $('a#pagnNextLink');
            if (nextLinkEle.length !== 0) {
                pageAttr = nextLinkEle.attr('href').match(/page=\d+/)[0];
            } else {
                pageAttr = false;
            }
        }
    } catch (error) {
        // We are ignoring this error because there can be other layout
    }
    // First layout found and found link
    if (pageAttr) return changePageParam(pageAttr, request);
    // First layout found but there is not link
    if (pageAttr === false) return false;

    // try to wait for second known layout
    try {
        if ($('.a-pagination .a-last').length !== 0) {
            const paginationHrefEle = $('ul.a-pagination li.a-last:not(".a-disabled") a');
            if (paginationHrefEle.length !== 0) {
                pageAttr = paginationHrefEle.attr('href').match(/page=\d+/)[0];
            } else {
                pageAttr = false;
            }
        }
    } catch (error) {
        log.exception(error, 'no pagination or unknown layout of page');
    }

    if (pageAttr) return changePageParam(pageAttr, request);
    return false;
}

module.exports = parsePaginationUrl;
