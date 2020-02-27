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
  "title": "GoPro HERO8 Black + PNY Elite-X 128GB U3 microSDHC Card (Bundle)",
  "thumbnailImage": "https://images-na.ssl-images-amazon.com/images/I/31fbysMcYFL.jpg",
  "sellers": [
    {
      "price": "$399.99",
      "priceParsed": 399.99,
      "condition": "New",
      "sellerName": "TTP Retail",
      "prime": true,
      "shippingInfo": "",
      "shopUrl": "www.amazon.com/gp/aag/main/ref=olp_merch_name_1/131-4745621-4725555/?seller=ANIVUW1SREVVT",
      "pricePerUnit": null
    }
  ],
  "asin": "B07XZMHTL5",
  "itemDetailUrl": "https://www.amazon.com/dp/B07XZMHTL5",
  "sellerOffersUrl": "https://www.amazon.com/gp/offer-listing/B07XZMHTL5",
  "currency": "USD",
  "itemDetail": {
    "featureDesc": "BUNDLE: GoPro HERO8 Black Camera + PNY Elite-X 128GB microSDHC Card with Adapter-UHS-I, U3\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t \n\t\t\t\t\t\t\tSTREAMLINED DESIGN - The re-imagined shape is more pocketable, and folding fingers at the base let you swap mounts quickly. A new side door makes changing batteries even faster, and the lens is now 2x more impact-resistant.\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t \n\t\t\t\t\t\t\tHERO8 BLACK MODS - Vloggers, pro filmmakers and aspiring creators can do more than ever imagined – with quick-loading accessories like flashes, microphones, LCD screens and more. Just add the optional Media Mod to up your capture game.\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t \n\t\t\t\t\t\t\tHYPERSMOOTH 2.0 - Smooth just got smoother. Now HERO8 Black has three levels of stabilisation – On, High and Boost – so you can pick the best option for whatever you do. Get the widest views possible, or boost it up to the smoothest video ever offered in a HERO camera. Plus, HyperSmooth works with all resolutions and frame rates, and features in-app horizon levelling.\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\t\t \n\t\t\t\t\t\t\tTIMEWARP 2.0 - Capture super-stabilised time lapse videos while you move through an activity. And now, TimeWarp automatically adjusts speed based on motion, scene detection and lighting. You can even slow down the effect to real time – savouring interesting moments – and then tap to speed it back up.\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t\n\t\t\t\t\n                \n                 \t\n               \n               \n\t\t\t\n\t\t\t\n\t\t\n\n\t\t\n\n\t\t\n\t\t\t\n\t\t\t›\n\t\t\tSee more product details",
    "desc": "Color:Hero8 + 128GB SD Card\n            \n          \n          \n        \n      \n    \n  \n\n\n        \n        \n     \n\t       \n     \n\n     \n                              \n     \n       \n        \n         \n        \n        \t\n        \t\n        \t\t\n        \t\t\tThis is HERO8 Black – the most versatile, unshakable HERO camera ever. A streamlined design makes it more pocketable than ever, and swapping mounts takes just seconds thanks to built-in folding fingers. FEATURES & BENEFITS:  LIVEBURST - Record the moments 1.5 seconds before and after your shot SUPERPHOTO + HDR - Capture killer 12-MP photos with improved HDR with reduced blur and serious detail, even in low-light areas. NIGHT LAPSE VIDEO - Capture amazing time lapse videos at night in 4K, 2.7K 4:3, 1440p or 1080p, all processed in-camera. DIGITAL LENSES - Now you can toggle between Narrow, Linear, Wide and SuperView.  LIVE STREAMING IN 1080P VOICE CONTROL - Go hands-free with 14 voice commands  ADVANCED WIND-NOISE REDUCTION - New front mic location and improved algorithms that actively filter out wind noise. RAW IN ALL PHOTO MODES - now available for time lapse and burst photos.  PRESETS - Presets for Standard, Activity, Cinematic and Slo-Mo shots.  PORTRAIT ORIENTATION - Capture photos and videos in portrait orientation – perfect for your Snapchat and Instagram Stories. RUGGED + WATERPROOF - Share experiences you can’t capture with your phone. HERO8 Black is rugged, waterproof to 10 m and down for adventure. PRO-QUALITY 4K60 + 1080P240 VIDEO - Stunning video resolution, impressive frame rates and super slo-mo combine with HyperSmooth stabilization. 8X SLO-MO - Ultra-high frame rate 1080p240 video – with HyperSmooth 2.0 stabilisation – allows up to 8x slow motion to relive epic moments in all their glory. 100-MBPS BIT RATE - Record studio-quality footage with bit rate options of up to 100 Mbps. GPS + MOTION SENSORS - GPS captures your location, altitude and speed.  FACE, SMILE, BLINK + SCENE DETECTION - HERO8 Black knows when you face the camera, smile, blink and more.",
    "reviewsCount": "118 ratings",
    "stars": "4.2",
    "details": {
      "Brand Name": "GoPro",
      "Item Weight": "1.1 pounds",
      "Product Dimensions": "1.9 x 1.1 x 2.6 inches",
      "Item model number": "CHDXX-712",
      "Batteries": "1 Lithium ion batteries required. (included)",
      "Color Name": "Hero8 + 128GB SD Card",
      "ASIN": "B07XZMHTL5",
      "Customer Reviews": "/* \n    * Fix for UDP-1061. Average customer reviews has a small extra line on hover \n    * https://omni-grok.amazon.com/xref/src/appgroup/websiteTemplates/retail/SoftlinesDetailPageAssets/udp-intl-lock/src/legacy.css?indexName=WebsiteTemplates#40\n    */\n    .noUnderline a:hover { \n        text-decoration: none; \n    }\n\n\n\n\n    \n    \n    \n    \n        \n\n        \n\n        \n        \n        \n        \n\t\t\n\t\t\n\t\t\n\t\t\n\t\t        \n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t\n\t\t        \n        \n\n        \n            \n            \n            \n                \n                \n                    \n                        \n                        \n                            \n\n\n\n\n\n\n\n        \n            \n\n\n\n\n\n    \n        \n            \n                \n\n4.2 out of 5 stars\n                \n            \n        \n        \n    \n\n\n        \n        \n        \n        \n\n        \n\n        \n\n        \n        \n        \n        \n\n        \n        \n        \n        \n            \n            \n                \n                    \n                        118 ratings\n                    \n                \n            \n                \n                    P.when('A', 'ready').execute(function(A) {\n                        A.declarative('acrLink-click-metrics', 'click', { \"allowLinkDefault\" : true }, function(event){\n                            if(window.ue) {\n                                ue.count(\"acrLinkClickCount\", (ue.count(\"acrLinkClickCount\") || 0) + 1);\n                            }\n                        });\n                    });\n                \n            \n            \n            \n            \n        \n        \n        \n            P.when('A', 'cf').execute(function(A) {\n                A.declarative('acrStarsLink-click-metrics', 'click', { \"allowLinkDefault\" : true },  function(event){\n                    if(window.ue) {\n                        ue.count(\"acrStarsLinkWithPopoverClickCount\", (ue.count(\"acrStarsLinkWithPopoverClickCount\") || 0) + 1);\n                    }\n                });\n            });\n        \n\n\n                        \n                    \n                \n            \n        \n    \n\n\n  4.2 out of 5 stars",
      "Best Sellers Rank": "#18,706 in Electronics (See Top 100 in Electronics)\n        \n              \n                #122 in Sports & Action Video Cameras",
      "Shipping Weight": "1.1 pounds (View shipping rates and policies)",
      "Date First Available": "October 1, 2019"
    },
    "images": [
      "https://images-na.ssl-images-amazon.com/images/I/51J59KDjkML._AC_SL1429_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61ZFNcSy4jL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/41M2lMmip4L._AC_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61MeYsWbiEL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61q%2B0-lHduL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/614Yf6ECc-L._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61X3Iz9kNYL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71FMDNDDZxL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/91-amHuPrLL._AC_SL1500_.jpg"
    ]
  }
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
