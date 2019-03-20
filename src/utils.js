const Apify = require('apify');

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

module.exports = saveItem;
