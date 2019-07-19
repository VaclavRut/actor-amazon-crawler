const Apify = require('apify');
const url = require('url');

async function checkSaveCount(datasetId, maxResults) {
    const dataset = await Apify.openDataset(datasetId);
    const { itemCount } = await dataset.getInfo();

    if (maxResults === null || maxResults === 0) {
        return true;
    }

    if (itemCount < maxResults) {
        return true;
    }
    return false;
}

async function saveItem(type, request, item, input, datasetId) {
    if (type === 'NORESULT') {
        if (input.maxResults) {
            if (await checkSaveCount(datasetId, input.maxResults) === true) {
                await Apify.pushData({
                    status: 'No sellers for this keyword.',
                    keyword: request.userData.keyword,
                });
            } else {
                console.log('Finished');
                process.exit(0);
            }
        } else {
            await Apify.pushData({
                status: 'No sellers for this keyword.',
                keyword: request.userData.keyword,
            });
        }
    } else if (type === 'RESULT') {
        if (input.maxResults) {
            if (await checkSaveCount(datasetId, input.maxResults) === true) {
                await Apify.pushData(item);
            } else {
                console.log('Finished');
                process.exit(0);
            }
        } else {
            await Apify.pushData(item);
        }
    }
}

function getOriginUrl(request) {
    const parsed = url.parse(request.url, true, true);
    const originUrl = url.format({
        protocol: parsed.protocol,
        hostname: parsed.hostname,
    });
    return originUrl;
}

function getHostname(request) {
    const parsed = url.parse(request.url, true, true);
    const originUrl = url.format({
        hostname: parsed.hostname,
    });
    return originUrl;
}

function getCurrency(request) {
    const parsed = url.parse(request.url, true, true);
    switch (parsed.hostname) {
        case 'amazon.com':
            return 'USD';
        case 'amazon.co.uk':
            return 'GBP';
        case 'amazon.de':
            return 'EUR';
        case 'amazon.fr':
            return 'EUR';
        case 'amazon.it':
            return 'EUR';
        case 'amazon.in':
            return 'INR';
        case 'amazon.ca':
            return 'CAD';
    }
}


module.exports = { saveItem, getOriginUrl, getHostname, getCurrency };
