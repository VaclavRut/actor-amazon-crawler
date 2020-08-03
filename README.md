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
* AE - https://www.amazon.ae

If you want to add another country, contact us.

Configuration then extracts all seller offers for a given keyword, so if there is pagination on the seller offers page, you get all offers!

## Sample result
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
    },
    {
      "price": "$209.00",
      "priceParsed": 209,
      "condition": "New",
      "sellerName": "Amazon.com",
      "prime": true,
      "shippingInfo": "",
      "shopUrl": "www.amazon.com",
      "pricePerUnit": null
    },
    {
      "price": "$257.63",
      "priceParsed": 257.63,
      "condition": "New",
      "sellerName": "Triplenet Pricing INC",
      "prime": false,
      "shippingInfo": "",
      "shopUrl": "www.amazon.com/gp/aag/main/ref=olp_merch_name_4/?seller=AAZRLVTNON75Z",
      "pricePerUnit": null
    },
    {
      "price": "$249.00",
      "priceParsed": 249,
      "condition": "New",
      "sellerName": "Aventis Systems",
      "prime": false,
      "shippingInfo": "",
      "shopUrl": "www.amazon.com/gp/aag/main/ref=olp_merch_name_5/?seller=A1PUHO6D4MM5FC",
      "pricePerUnit": null
    },
    {
      "price": "$253.73",
      "priceParsed": 253.73,
      "condition": "New",
      "sellerName": "Hot Deals 4 Less®",
      "prime": false,
      "shippingInfo": "",
      "shopUrl": "www.amazon.com/gp/aag/main/ref=olp_merch_name_6/?seller=A1YAK8U7QV5H1E",
      "pricePerUnit": null
    },
    {
      "price": "$217.81",
      "priceParsed": 217.81,
      "condition": "New",
      "sellerName": "OneDealOutlet Online",
      "prime": false,
      "shippingInfo": "",
      "shopUrl": "www.amazon.com/gp/aag/main/ref=olp_merch_name_7/?seller=A4UCFL9LU89NR",
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
      },
      {
        "userName": "Olga Bezgodov",
        "reviewTitle": "No vga plug",
        "reviewedIn": "Reviewed in the United States on January 22, 2020",
        "reviewDescription": "Don’t buy! Doesn’t have a vga plug and no controller and no headphones audio"
      },
      {
        "userName": "Ken Necochea Jr",
        "reviewTitle": "I had one already and I loved the resolution that I replaced the other dual monitor ...",
        "reviewedIn": "Reviewed in the United States on January 10, 2018",
        "reviewDescription": "Quality monitor 9.5 on a scale of 10, and I got it for a smokin' price.  I had one already and I loved the resolution that I replaced the other dual monitor with a twin..."
      },
      {
        "userName": "SMoreHouse",
        "reviewTitle": "It's Fine",
        "reviewedIn": "Reviewed in the United States on April 26, 2020",
        "reviewDescription": "It's fine for my work laptop that happens to have a display port connection but there's no HDMI for any other computer in my house."
      },
      {
        "userName": "Dena",
        "reviewTitle": "Great",
        "reviewedIn": "Reviewed in the United States on November 16, 2018",
        "reviewDescription": "Just what we wanted"
      },
      {
        "userName": "Steve L",
        "reviewTitle": "Not as described",
        "reviewedIn": "Reviewed in the United States on April 29, 2020",
        "reviewDescription": "The picture shows that it has a HDMI port.  The actual unit does not have this, and now I have to buy a $30 adapter.  Amazon- please credit me the cost of the adapter."
      },
      {
        "userName": "Gron",
        "reviewTitle": "Monitor  was as advertised adver",
        "reviewedIn": "Reviewed in the United States on March 29, 2020",
        "reviewDescription": "Monitor  was as advertised adver"
      },
      {
        "userName": "HY",
        "reviewTitle": "Five Stars",
        "reviewedIn": "Reviewed in the United States on January 29, 2018",
        "reviewDescription": "Great monitor at a good price."
      },
      {
        "userName": "Robert B.",
        "reviewTitle": "Shipped on time and in good condition. It's an upgrade from a 22\" Samsung ...",
        "reviewedIn": "Reviewed in the United States on October 4, 2016",
        "reviewDescription": "Shipped on time and in good condition. It's an upgrade from a 22\" Samsung monitor. It is clear, sharp, and the color is good. Had to turn down the brightness which was all the way up when it arrived. The controls are easily accessible and simple to operate. I'd recommend it to anyone."
      },
      {
        "userName": "David Burg",
        "reviewTitle": "Cheaply built, poor viewing angle, low picture quality",
        "reviewedIn": "Reviewed in the United States on July 17, 2019",
        "reviewDescription": "It's a big screen for not much money. But it's cheaply built - the plastic moves and makes cracking sound when you grab the monitor to move it. It has a thick border when many modern monitor feature edge-less build.The viewing angle, especially in portrait orientation is horrid - moving your head a few inches left or right and the color / contrast very visibly changes.I recommend you to get something else than this monitor."
      },
      {
        "userName": "Dr. Aninda Shome",
        "reviewTitle": "poor resolution, not meant for photographs",
        "reviewedIn": "Reviewed in the United States on October 10, 2018",
        "reviewDescription": "low quality resolutionphotos do not show very wellok for regular word and xlscan be used in portrait mode"
      }
    ]
  }
}
```
## Proxy
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

### Consumption
Using Raw requests - 0.0884 CU when extracting 20 results from keyword search
Using a Browser - 0.6025 CU when extracting 20 results from keyword search


## Changelog
Changes related to the new version

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

