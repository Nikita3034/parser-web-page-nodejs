const { chromium } = require('playwright');

(async () => {
    var browser = await chromium.launch();
    var context = await browser.newContext();
    var page = await context.newPage();

    // INFO: your url
    var url = '';

    try {
        // INFO: load page
        await page.goto(url, { waitUntil: 'load' });

        // INFO: waiting some time
        await page.waitForTimeout(2000);

        // INFO: clicking on some button
        await page.click(''); // #id / .class / some attribute

        // INFO: waiting for element on page
        await page.waitForSelector(''); // #id / .class / some attribute

        // INFO: getting text from one element
        let element = await page.$eval('', el => el.textContent); // #id / .class / some attribute

        // INFO: getting text from multiple elements
        let elements = await page.$$eval('', els => els.map(el => el.textContent)); // #id / .class / some attribute
    } catch (error) {
        console.error(`Error ${link}:`, error);
    }
})();
