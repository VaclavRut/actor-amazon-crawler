## Amazon crawler

This configuration will extract items for a keywords that you will specify in the input, and it will automatically extract all pages for the given keyword.
You can specify more keywords on the input for one run. Also, there are more modes for the configuration to run, so check the description below.

Configuration then extracts all seller offers for a given keyword, so if there is pagination on the seller offers page, you get all offers!

- [Sample result](#sample-result)
- [Proxy](#proxy)
- [Asin crawling](#asin-crawling)
- [Direct urls crawling](#direct-urls-crawling)
- [Compute units consumption](#compute-units-consumption)
- [Changelog](#changelog)

Find more information about business benefits and possible usage of the scraped data in [YouTube Video](https://www.youtube.com/watch?v=BsidLZKdYWQ).

### Sample result
```
{
  "title": "Samsung SE450 Series 27 inch FHD 1920x1080 Desktop Monitor for Business, DVI, VGA, DisplayPort, VESA mountable, 3-Year Warranty, TAA (S27E450D)",
  "thumbnailImage": "https://images-na.ssl-images-amazon.com/images/I/51kKM4aZ+WL.jpg",
  "sellers": [
    {
      "price": "$174.99",
      "priceParsed": 174.99,
      "condition": "Used - Like New",
      "sellerName": "Luigi & Co. LLC",
      "prime": true,
      "shippingInfo": "",
      "shopUrl": "www.amazon.com/gp/aag/main/ref=olp_merch_name_1/?seller=AP5WUUVHWNT7",
      "pricePerUnit": null
    },
    {
      "price": "$208.50",
      "priceParsed": 208.5,
      "condition": "New",
      "sellerName": "Scatterlings Store",
      "prime": true,
      "shippingInfo": "",
      "shopUrl": "www.amazon.com/gp/aag/main/ref=olp_merch_name_2/?seller=A42717TRWCXE4",
      "pricePerUnit": null
    }
  ],
  "asin": "B010N07D4W",
  "itemDetailUrl": "https://www.amazon.com/dp/B010N07D4W",
  "sellerOffersUrl": "https://www.amazon.com/gp/offer-listing/B010N07D4W",
  "currency": "USD",
  "itemDetail": {
    "InStock": true,
    "delivery": "Arrives:  July 30 - Aug 14",
    "featureDesc": "About this item\n\n\n\n\n\n\n\n\n\nThis fits your .\n\n\n\n\n\n Make sure this fits\nby entering your model number.\n\n\n\n\n\n\n\n27-inch 16:9 FHD 1920 x 1200 resolution, LED-backlit LCD screen delivers bright, sharp images with a low-glare TN panel and MagicAngle technology providing a comfortable wide-angle viewing experience\n\n\n\n\nVersatile connectivity options including VGA, DVI, and DisplayPort 1.2 inputs\n\n\n\n\nVESA compatibility enables easy mounting to a wall or monitor stand, along with a fully adjustable stand included with height, tilt, swivel, and pivot features\n\n\n\n\nEye Saver Mode and Flicker-Free technology help minimize eye strain during long working hours\n\n\n\n\n3-Year Business Warranty with extended warranties available for purchase, TAA Compliant for Federal Government Customers",
    "desc": "The Samsung S27E450D 27” desktop business monitor offers the ideal balance between value and features for everyday business use. Offering impressive picture quality at an accessible price point, this business desktop monitor excels across a variety of commercial applications. The Full HD 1920 x 1080 LED low-glare TN panel displays a sharp, bright, and beautiful image, while Mega infinity dynamic contrast ratio ensures subtle detail even in lighter and darker areas of the picture. The monitor is also made with up to 30% recycled plastic, and with a low-energy consumption of less than 0.005W in standby, and true 0W in off mode, the S27E450D is ideal for eco-conscious businesses looking to reduce their carbon footprint and save on energy costs. Additionally, users can adjust the monitor for their ideal ergonomic comfort with the fully adjustable stand including height, tilt, swivel and pivot feature, which lets you use the monitor in portrait mode, or mount the monitor on any VESA compatible mount or stand. To top it off, your investment is secured with a 3-year business warranty.",
    "breadCrumbs": "Electronics›Computers & Accessories›Monitors",
    "NumberOfQuestions": 7,
    "reviewsCount": "21 ratings",
    "stars": "3.7",
    "details": {
      "Standing screen display size": "27 Inches",
      "Max Screen Resolution": "1920 x 1080 Pixels",
      "Brand": "Samsung Business",
      "Series": "S27E450D",
      "Item model number": "LS27E45KDHG/GO",
      "Item Weight": "13.9 pounds",
      "Product Dimensions": "25.2 x 8.8 x 15.7 inches",
      "Item Dimensions  L x W x H": "25.2 x 8.8 x 15.7 inches",
      "Color": "Black",
      "Manufacturer": "Samsung",
      "ASIN": "B010N07D4W",
      "Is Discontinued By Manufacturer": "No",
      "Date First Available": "June 30, 2015",
      "Customer Reviews": "3.7 out of 5 stars\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n21 ratings\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n3.7 out of 5 stars",
      "Best Sellers Rank": "#22,010 in Electronics (See Top 100 in Electronics)\n\n\n#648 in Computer Monitors"
    },
    "images": [
      "https://images-na.ssl-images-amazon.com/images/I/91%2BDRhesUGL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81P-%2B%2BINuIL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/91WIergLFwL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81Or5w16-DL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81SEgFF5GiL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/91jMSIRM08L._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61gnj0tv%2BDL._AC_SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/31S4T6bcjaL._AC_.jpg"
    ],
    "NumberOfReviews": 13,
    "reviews": [
      {
        "userName": "A. J. Kim",
        "reviewTitle": "Nice replacement for my Samsung 22\"",
        "reviewedIn": "Reviewed in the United States on May 9, 2017",
        "reviewDescription": "There are probably much better resolution monitors out there which is why not giving 5-stars, but I bought this monitor for other reasons. I was looking for 27\" monitors that had DVI connector to replace my Samsung 22\" monitors. Surprising, I was having a hard time finding monitors that had DVI connections, most seem to be HDMI, USB, or DisplayPort. This one has a DVI, D-Sub, and DisplayPort. I didn't want a curved monitor. I didn't want speakers in the monitor if at all possible. It was my intention to mount on a monitor arm, so I needed it to have VESA mounting. I didn't care for much of a stand or any frills it might have on it. One big reason I liked this monitor is its has a AC connection with a real power cord and not a DC connection with a power pack that would be sitting on the floor. I like Samsung products. I have several home electronic devices that are Samsung that have been really nice, quality products. If one of my Samsung 22\" monitors hadn't started to flicker when I powered on, I would have kept using them. I probably had them for more than 10yrs. Since one monitor was starting to go bad, I thought maybe it was time to upgrade along with a computer hardware upgrade I'm also planning for in next couple of months."
      },
      {
        "userName": "Michael R",
        "reviewTitle": "There are better choices",
        "reviewedIn": "Reviewed in the United States on April 25, 2020",
        "reviewDescription": "Thick bezel. Color not vivid. Has to be turned on after the computer No sync  Display menu limited. For the price. I liked my Acer better. 60 Hz refresh.  Many connection options. Upon boot, the monitor has trouble finding the correct connection and cycles through the options several times looking for the connection. It turns itself off after a period of not using instead of standby.  The screen is muted in color."
      },
      {
        "userName": "David White",
        "reviewTitle": "Amazon search sucks",
        "reviewedIn": "Reviewed in the United States on May 17, 2020",
        "reviewDescription": "Monitor is fine.  Problem is that when you search Amazon for \"monitor with speakers\", it should be able to show only those.  This monitor DOES NOT have speakers!  Totally frustrating!!!"
      }
    ]
  }
}
```
### Proxy
For proper function of the actor are proxies required, it is not recommended to run it on a free account for more than sample of results.
If you plan to run it for more then couple results, subscribe to Apify platform to have access to large pool of proxies.

### Asin crawling
One of the features is to get price offers for a list of ASINs, if this what you need, you can specify the ASINs on the input with combination of countries to get results for.
```
"asins": [{
      "asin":"B07JG7DS1T",
      "countries":["de","it","es","gb","us","fr","in","ca"]
  }]
```
With this setup, we will check for all countries whether there is that ASIN available and get all seller offers for that.
### Direct urls crawling
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
### Additional options
maxResults - If you want to limit number of results to extract, set this value with number of results, otherwise keep it blank or 0. It doesn't work 100% precisely, that if you put there 5 results, it will create more of the records because of the concurrency.

### Compute units consumption
Using Raw requests - 0.0884 CU when extracting 20 results from keyword search
Using a Browser - 0.6025 CU when extracting 20 results from keyword search

### Supported countries
Also, you can specify on the input, which country you would like to extract the items.Now we support these countries:
* US - https://www.amazon.com
* GB - https://www.amazon.co.uk
* DE - https://www.amazon.de
* ES - https://www.amazon.es
* FR - https://www.amazon.fr
* IT - https://www.amazon.it
* IN - https://www.amazon.in
* CA - https://www.amazon.ca
* JP - https://www.amazon.co.jp
* AE - https://www.amazon.ae
* SA - https://www.amazon.sa
* BR - https://www.amazon.com.br
* MX - https://www.amazon.com.mx
* SG - https://www.amazon.sg
* TR - https://www.amazon.com.tr
* NL - https://www.amazon.nl
* AU - https://www.amazon.com.au

If you want to add another country, contact us.


### Changelog
Changes related to the new versions are listed in the [CHANGELOG file](/CHANGELOG.md).
