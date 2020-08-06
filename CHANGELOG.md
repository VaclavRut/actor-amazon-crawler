# Changelog
All notable changes to this project will be documented in this file.

### Added
- Scraper Type - Type of scraper that can be used to evaluate amazon `Basic Crawler` and a default of `Puppeteer`.
- Country - Added a new country domain `UAE`.
- Delivery Location - Spinner to pick location where make deliveries
- Reviews to be extracted with a default maximum number
- General Search - Added Search box that takes in all search types of Asins, Default Urls or Key Words.
- Search Type - Select the kind of search being performed .i.e differentiate between `asins`, `keywords` and `default urls`
- Modularization - Functionality is broken down to allow different modes to reuse code
### Removed
- Disjoint Searches - No more different search boxes for keywords, asins and default urls

### Changed
- Supported input - The search input has changed to support different formats for the asins and directurls


``Asins``
```
"asins": [{
      "asin":"B07JG7DS1T",
      "countries":["de","it","es","uk","us","fr","in","ca"]
}]
```
and
```"B07P6Y8L3F","B07P6Y8L3F","B07JG7DS1T"```


```Direct Urls```

```
[{
    "url": "https://www.amazon.com/dp/B07P6Y8L3F",
    "userData": {
        "label": "detail",
        "keyword": "B07P6Y8L3F",
        "asin": "B07P6Y8L3F",
        "detailUrl": "https://www.amazon.com/dp/B07P6Y8L3F",
        "sellerUrl": "https://www.amazon.com/gp/offer-listing/B07P6Y8L3F"
    }
},{
      "url": "https://www.amazon.com/dp/B07P6Y8L3F",
      "userData": {
          "label": "detail",
          "keyword": "B07P6Y8L3F",
          "asin": "B07P6Y8L3F",
          "detailUrl": "https://www.amazon.com/dp/B07P6Y8L3F",
          "sellerUrl": "https://www.amazon.com/gp/offer-listing/B07P6Y8L3F"
      }
  }]
```
and
```
"https://www.amazon.com/s?k=luna+sandals&ref=nb_sb_noss", "https://www.amazon.com/s?k=luna+sandals&ref=nb_sb_noss"
```
