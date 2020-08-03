const Apify = require('apify');

async function updateCookies(params) {
    const { domain, delivery } = params;
    const deliverCountry = delivery.split(',');
    const code = deliverCountry[0];
    const deliveryCode = deliverCountry[1];
    // console.log(deliveryCode)
    const browser = await Apify.launchPuppeteer( {headless: true, slowMo: 200 });
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation()
    await page.goto(domain);
    const cookies = await page.cookies();
    // console.log(cookies)
    let exists = false;
    for (const cookie of cookies) {
        if (cookie.name === 'sp-cdn') {
            if (cookie.value != `"L5Z9:${code}"`) {
                exists = true;
            }
            exists = true;
            cookie.value = `"L5Z9:${code}"`;
            await page.setCookie(cookie);
        }
    }
    if (!exists) {
        try {
            // await page.setCookie({name: 'sp-cdn', value: `"L5Z9:${delivery}"`});
            await page.waitForSelector('#nav-global-location-slot #glow-ingress-line2');
            await page.click('#nav-global-location-slot #glow-ingress-line2');

            await page.waitForSelector('.a-declarative > .a-dropdown-container > #GLUXCountryListDropdown > .a-button-inner > .a-button-text');
            await page.click('.a-declarative > .a-dropdown-container > #GLUXCountryListDropdown > .a-button-inner > .a-button-text');

            // console.log(`.a-popover-wrapper #${deliveryCode}`);
            await page.waitForSelector(`.a-popover-wrapper #${deliveryCode}`);
            await page.click(`.a-popover-wrapper #${deliveryCode}`);
            // console.log(page.cookies())
        }
        catch (e) {
            //Ignore this
        }
    }

    await navigationPromise;

    return cookies ? cookies : await page.cookies();
}
exports.updateCookies = updateCookies;
