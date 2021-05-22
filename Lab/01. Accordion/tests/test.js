const {chromium} = require('playwright-chromium');
const {expect} = require('chai');

let browser, page; // Declare reusable variables

describe('E2E tests', function () {
    this.timeout(6000);
    before(async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('should load static page', async function () {
        await page.goto(`http://localhost:3000`);
        await page.screenshot({path: 'index.png'})
    });

    it('should have the right content', async function () {
        await page.goto(`http://localhost:3000`);
        //.textContent('.accordion .head span');
        const content = await page.content();
        expect(content).to.contains('Scalable Vector Graphics');
        expect(content).to.contains('Open standard');
        expect(content).to.contains('Unix');
        expect(content).to.contains('ALGOL');
    });


    it('should toggle content', async function () {
        await page.goto(`http://localhost:3000`);
        await page.click('text=More');
        await page.waitForSelector('.extra p');
        const visible = await page.isVisible('.extra p');
        expect(visible).to.be.true;
    });



    it('should toggle content hide', async function () {
        await page.goto(`http://localhost:3000`);

        await page.click('#main>.accordion:first-child >> text=More');
        await page.waitForSelector('#main>.accordion:first-child >> .extra p');
        await page.click('#main>.accordion:first-child >> text=Less');

        const visible = await page.isVisible('#main>.accordion:first-child >> .extra p');
        expect(visible).to.be.false;
    });
});