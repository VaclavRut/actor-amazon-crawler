class searchUrlsCreator {
    async run(input) {
        if (!input.country) {
            throw new Error('Country required');
        }
        if (!input.keywords || !input.keywords.length) {
            throw new Error('Keywords required');
        }

        const searchUrlBase = this.getBaseUrl(input.country);

        const searchUrls = input.keywords.map((keyword) => ({
            keyword: keyword,
            url: searchUrlBase + keyword.replace(/\s/g, "+").trim()
        }));

        return searchUrls;
    }

    getBaseUrl(country) {
        const baseUrls = {
            US: 'https://www.amazon.com/s?k=',
            UK: 'https://www.amazon.co.uk/s?k=',
            DE: 'https://www.amazon.de/s?k=',
            ES: 'https://www.amazon.es/s?k=',
            FR: 'https://www.amazon.fr/s?k=',
            IT: 'https://www.amazon.it/s?k=',
            IN: 'https://www.amazon.in/s?k=',
            CA: 'https://www.amazon.ca/s?k=',
        };
        const url = baseUrls[country];
        if (!url) throw new Error('Selected country is not supported, contact us.');
        return url;
    }
}

module.exports = searchUrlsCreator;
