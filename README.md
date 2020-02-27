## Amazon crawler

This configuration will extract items for a keywords that you will specify in the input, and it will automatically extract all pages for the given keyword.
You can specify more keywords on the input for one run. Also, there are more modes for the configuration to run, so check the description below.

Also, you can specify on the input, which country you would like to extract the items.
Now we support these countries:
* US - https://www.amazon.com
* GB - https://www.amazon.co.uk
* DE - https://www.amazon.de
* ES - https://www.amazon.es
* FR - https://www.amazon.fr
* IT - https://www.amazon.it
* IN - https://www.amazon.in
* CA - https://www.amazon.ca
* JP - https://www.amazon.co.jp

If you want to add another country, contact us.

Configuration then extracts all seller offers for a given keyword, so if there is pagination on the seller offers page, you get all offers!

## Sample result
```
{
  "title": "Apple iPhone XR, 64GB, Red - Fully Unlocked (Renewed)",
  "image": "https://images-na.ssl-images-amazon.com/images/I/41uzf1f3d2L.jpg",
  "asin": "B07P6Y8L3F",
  "itemDetailUrl": "https://www.amazon.com/dp/B07P6Y8L3F",
  "sellerOffersUrl": "https://www.amazon.com/gp/offer-listing/B07P6Y8L3F",
  "currency": "USD",
  "itemDetail": {
      "featureDesc": "Fully unlocked and compatible with any carrier of choice (e.g. AT&T, T-Mobile, Sprint, Verizon, US-Cellular, Cricket, Metro, etc.).\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t \n\t\t\t\t\t\t\tThe device does not come with headphones or a SIM card. It does include a charger and charging cable that may be generic, in which case it will be UL or Mfi (“Made for iPhone”) Certified.\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t \n\t\t\t\t\t\t\tInspected and guaranteed to have minimal cosmetic damage, which is not noticeable when the device is held at arm’s length.\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t \n\t\t\t\t\t\t\tSuccessfully passed a full diagnostic test which ensures like-new functionality and removal of any prior-user personal information.\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t \n\t\t\t\t\t\t\tTested for battery health and guaranteed to have a minimum battery capacity of 80%.",
      "desc": "Style:Fully Unlocked\n            \n          \n            \n            \n            \n                 | \n            \n             Color:Red\n            \n          \n            \n            \n            \n                 | \n            \n             Size:64GB\n            \n          \n          \n        \n      \n    \n  \n\n\n        \n        \n     \n\t       \n     \n\n     \n                              \n     \n       \n        \n         \n        \n        \t\n        \t\n        \t\t\n        \t\t\tOnly iPhone No other phone is like iPhone. Only when hardware and software are designed together can they truly work together. Apple teams design the world’s best products, with the most innovative displays, chips, cameras, operating systems, and services. But just as important, the teams collaborate so that all the components of iPhone work together efficiently and beautifully. While this might seem like an obvious way to work, no other smartphone is made this way. And it makes all the difference. It means that the camera team can work with the chip team to leverage the power of the A12 Bionic. So that when you frame a shot, the ISP and Neural Engine identify faces in the frame. Detect specific features. And optimize for lighting, white balance, and more before you even tap the shutter. This is the kind of stuff you’d never even know is happening. You just see the result — the shot you wanted, with more detail, true-to-life color, and dynamic range than you would have thought possible from a smartphone.",
      "reviewsCount": "2,728 ratings",
      "stars": "4.5",
      "details": {
        "Product Dimensions": "7 x 5 x 4 inches",
        "Item Weight": "0.48 ounces",
        "Shipping Weight": "13.6 ounces (View shipping rates and policies)",
        "ASIN": "B07P6Y8L3F",
        "California residents": "Click here for Proposition 65 warning",
        "Item model number": "A1984",
        "Batteries": "1 Lithium ion batteries required. (included)",
        "Customer Reviews": "/* \n    * Fix for UDP-1061. Average customer reviews has a small extra line on hover \n    * https://omni-grok.amazon.com/xref/src/appgroup/websiteTemplates/retail/SoftlinesDetailPageAssets/udp-intl-lock/src/legacy.css?indexName=WebsiteTemplates#40\n    */\n    .noUnderline a:hover { \n        text-decoration: none; \n    }\n\n\n\n\n    \n    \n    \n    \n        \n\n        \n\n        \n        \n        \n        \n\t\t\n\t\t\n\t\t\n\t\t\n\t\t        \n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t        \n        \n\n        \n            \n            \n            \n                \n                \n                    \n                        \n                        \n                            \n\n\n\n\n\n\n\n        \n            \n\n\n\n\n\n    \n        \n            \n                \n\n4.5 out of 5 stars\n                \n            \n        \n        \n    \n\n\n        \n        \n        \n        \n\n        \n\n        \n\n        \n        \n        \n        \n\n        \n        \n        \n        \n            \n            \n                \n                    \n                        2,728 ratings\n                    \n                \n            \n                \n                    P.when('A', 'ready').execute(function(A) {\n                        A.declarative('acrLink-click-metrics', 'click', { \"allowLinkDefault\" : true }, function(event){\n                            if(window.ue) {\n                                ue.count(\"acrLinkClickCount\", (ue.count(\"acrLinkClickCount\") || 0) + 1);\n                            }\n                        });\n                    });\n                \n            \n            \n            \n            \n        \n        \n        \n            P.when('A', 'cf').execute(function(A) {\n                A.declarative('acrStarsLink-click-metrics', 'click', { \"allowLinkDefault\" : true },  function(event){\n                    if(window.ue) {\n                        ue.count(\"acrStarsLinkWithPopoverClickCount\", (ue.count(\"acrStarsLinkWithPopoverClickCount\") || 0) + 1);\n                    }\n                });\n            });\n        \n\n\n                        \n                    \n                \n            \n        \n    \n\n\n  4.5 out of 5 stars",
        "Best Sellers Rank": "#479 in Cell Phones & Accessories (See Top 100 in Cell Phones & Accessories)\n        \n              \n                #1 in Carrier Cell Phones"
      },
   "sellers": [
      {
            "price": "$424.99",
            "priceParsed": 424.99,
            "condition": "Renewed",
            "sellerName": "QD Electronics",
            "prime": true,
            "shippingInfo": "",
            "shopUrl": "www.amazon.com/gp/aag/main/ref=olp_merch_name_1/143-8797511-4814161/?seller=A7GGEUJEC47TC",
            "pricePerUnit": null
          },
          {
            "price": "$424.99",
            "priceParsed": 424.99,
            "condition": "Renewed",
            "sellerName": "BMOF86ST",
            "prime": true,
            "shippingInfo": "",
            "shopUrl": "www.amazon.com/gp/aag/main/ref=olp_merch_name_2/143-8797511-4814161/?seller=A318LWHFLUAG5N",
            "pricePerUnit": null
          },
          //and more, shortened for readme
    ],
}
```

##### Asin crawling
One of the features is to get price offers for a list of ASINs, if this what you need, you can specify the ASINs on the input with combination of countries to get results for.
Keep in mind that if you specify asins on the input, keywords search will be skipped, those functions can't be combined in one run.
```
"asins": [{
      "asin":"B07JG7DS1T",
      "countries":["de","it","es","gb","us","fr","in","ca"]
  }]
```
With this setup, we will check for all countries whether there is that ASIN available and get all seller offers for that.
##### Direct urls crawling
If you are more advanced and you have your ASINs already and don't want to crawl them manually, you can enqueue the requests from the input.
Here is a sample object to get itemDetail info:
```
{
    "url": "https://www.amazon.com/dp/B07P6Y8L3F",
    "userData": {
        "label": "detail",
        "keyword": "B07P6Y8L3F",
        "asin": "B07P6Y8L3F",
        "detailUrl": "https://www.amazon.com/dp/B07P6Y8L3F",
        "sellerUrl": "https://www.amazon.com/gp/offer-listing/B07P6Y8L3F"
    }
}
```
Here is a sample object to get seller info:
```
{
              "url": "https://www.amazon.de/gp/offer-listing/B07XRR7N5V/",
              "userData": {
                  "label": "seller",
                  "asin": "B07XRR7N5V",
                  "detailUrl": "https://www.amazon.de/dp/B07XRR7N5V/",
                  "sellerUrl": "https://www.amazon.de/gp/offer-listing/B07XRR7N5V/",
                  "country": "DE"
              }
          }
```
##### Additional options
maxResults - If you want to limit number of results to extract, set this value with number of results, otherwise keep it blank or 0. It doesn't work 100% precisely, that if you put there 5 results, it will create more of the records because of the concurrency.

#### Proxy
For proper function of the actor are proxies required, it is not recommended to run it on a free account for more than sample of results.
By default is using this configuration all proxies that you have access to, but if you are on the free plan, number of the proxies is very limited.

If you have purchased a residential proxy, you can specify it on the input, also you can specify just some proxy groups if it is your desire.
