function getBaseUrl(country) {
    const baseUrls = {
        US: 'https://www.amazon.com/',
        GB: 'https://www.amazon.co.uk/',
        DE: 'https://www.amazon.de/',
        ES: 'https://www.amazon.es/',
        FR: 'https://www.amazon.fr/',
        IT: 'https://www.amazon.it/',
        IN: 'https://www.amazon.in/',
        CA: 'https://www.amazon.ca/',
        JP: 'https://www.amazon.co.jp/',
    };
    const url = baseUrls[country];
    if (!url) throw new Error('Selected country is not supported, contact us.');
    return url;
}

async function createSearchUrls(input) {
    let searchUrlBase;
    if (input.asins) {
        console.log(`Going to enqueue ${input.asins.length} asins`);
        const builtUrls = [];
        for (const item of input.asins) {
            for (const country of item.countries) {
                searchUrlBase = getBaseUrl(country.toUpperCase());
                const sellerUrl = `${searchUrlBase}gp/offer-listing/${item.asin}`;
                builtUrls.push({
                    url: sellerUrl,
                    userData: {
                        label: 'seller',
                        asin: item.asin,
                        detailUrl: `${searchUrlBase}dp/${item.asin}`,
                        sellerUrl,
                        country: country.toUpperCase(),
                    },
                });
            }
        }
        return builtUrls;
    }

    if (!input.country) {
        throw new Error('Country required');
    }
    if (!input.keywords || !input.keywords.length) {
        throw new Error('Keywords required');
    }
    searchUrlBase = getBaseUrl(input.country);
    return input.keywords.map((keyword) => ({
        url: `${searchUrlBase}s?k=${keyword.replace(/\\s/g, '+').trim()}`,
        userData: {
            label: 'page',
            keyword,
        },
    }));
}

module.exports = createSearchUrls;
