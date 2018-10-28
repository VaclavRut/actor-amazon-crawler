class searchUrlsCreator {

    async run(input) {
        if (!input.country) {
            throw new Error('Country required');
        }
        if (!input.keywords) {
            throw new Error('Keywords required');
        }

        let searchUrlBase = this.getBaseUrl(input.country);
        let searchUrls = []


        for (let keyword of input.keywords) {
            searchUrls.push({
                keyword: keyword.item,
                url: searchUrlBase + keyword.item.replace(/\s/g, "+").trim()
            })
        }
        return searchUrls;
    }


    getBaseUrl(country) {
        switch (country) {
            case "US":
                return "https://www.amazon.com/s?k=";
            case "UK":
                return "https://www.amazon.co.uk/s?k=";
            case "DE":
                return "https://www.amazon.de/s?k=";
            case "ES":
                return "https://www.amazon.es/s?k=";
            case "FR":
                return "https://www.amazon.fr/s?k=";
            case "IT":
                return "https://www.amazon.it/s?k=";
            case "IN":
                return "https://www.amazon.in/s?k=";
            case "CA":
                return "https://www.amazon.ca/s?k=";
        }
    }
}

module.exports = searchUrlsCreator;
