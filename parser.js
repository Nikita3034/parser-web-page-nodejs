const { chromium } = require('playwright');

(async () => {
    var browser = await chromium.launch();
    var context = await browser.newContext();
    var page = await context.newPage();

    var url = ''; // TODO: set your url
    var results = [];
    var links = [];

    for (let i = 1; i < 4; i++) {
        await page.goto(url + '?page=' + i, { waitUntil: 'load' });
        await page.waitForTimeout(2000);
        const linksAgents = await page.$$eval('a.el-agent__more', links => links.map(link => link.href));
        links = links.concat(linksAgents)
    }

    await browser.close();

    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    for (let link of links) {
        try {
            await page.goto(link, { waitUntil: 'load', timeout: 10000 });
            await page.waitForTimeout(2000);
            await page.click('.ag-char__phones-toggle');

            await page.waitForSelector('.ag-char__phones');

            const content = await page.$$eval('.ag-char__phones a', item => item.map(item => item.textContent));

            const fio = await page.$eval('.ag-char__name', el => el.textContent);

            results.push({
                'fio': fio,
                'phone': content[0],
                'email': content[1]
            });
        } catch (error) {
            console.error(`Error ${link}:`, error);
        }
    }

    console.log(results);

    await browser.close();
})();