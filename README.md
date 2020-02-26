## Amazon crawler

This configuration will extract items for a keywords that you will specify in the input, and it will automatically extract all pages for the given keyword.
You can specify more keywords on the input for one run.

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

##### Additional options
LiveView - If you choose to enable the LiveView (or specify it in the input manually) it will enable you to view what is happening in the crawler, but it will slow down the actor

maxResults - If you want to limit number of results to extract, set this value with number of results, otherwise keep it blank or 0.

#### Proxy
For proper function of the actor are proxies required, it is not recommended to run it on a free account for more than sample of results.
By default is using this configuration all proxies that you have access to, but if you are on the free plan, number of the proxies is very limited.

If you have purchased a residential proxy, you can specify it on the input, also you can specify just some proxy groups if it is your desire.
```
"apifyProxyGroups": ["RESIDENTIAL"]
```
## Sample result
```
{
  "title": "Samsung Monitor S27A650D LED 69 cm (27 Zoll) Widescreen LED (DVI, VGA, 8ms Reaktionszeit) schwarz",
  "image": "https://images-eu.ssl-images-amazon.com/images/I/41rOn08kK4L.jpg",
  "sellers": [
    {
      "price": "EUR 119,00",
      "condition": "Gebraucht - Wie neu",
      "sellerName": "LapStore",
      "prime": false,
      "shippingInfo": "+ EUR 4,95 Versandkosten"
    },
    {
      "price": "EUR 129,00",
      "condition": "Gebraucht - Gut",
      "sellerName": "brandused",
      "prime": false,
      "shippingInfo": "KOSTENFREIE Lieferung"
    },
    {
      "price": "EUR 199,95",
      "condition": "B-Ware & 2.Wahl",
      "sellerName": "TechPoint1111",
      "prime": false,
      "shippingInfo": "KOSTENFREIE Lieferung"
    },
    {
      "price": "EUR 171,00",
      "condition": "Gebraucht - Akzeptabel",
      "sellerName": "handypcwelt1974",
      "prime": false,
      "shippingInfo": "+ EUR 89,00 Versandkosten"
    },
    {
      "price": "EUR 196,00",
      "condition": "Gebraucht - Sehr gut",
      "sellerName": "handypcwelt1974",
      "prime": false,
      "shippingInfo": "+ EUR 89,00 Versandkosten"
    }
  ],
  "keyword": "samsung monitor 27",
  "asin": "B005CYXNV2",
  "itemDetailUrl": "https://www.amazon.de/dp/B005CYXNV2",
  "sellerUrl": "https://www.amazon.de/gp/offer-listing/B005CYXNV2"
}
```

## Actor expects the file on the input in this structure:

```
{
  "maxResults":10,
  "country":"DE",
  "keywords": [ "samsung monitor 27", "Iphone XR" ],
  "liveView": true,
  "apifyProxyGroups": ["RESIDENTIAL"], //optional
  "asins": [{ // this is additional feature
      "asin":"B07JG7DS1T",
      "countries":["de","it","es","gb","us","fr","in","ca"]
  }]
}

```
