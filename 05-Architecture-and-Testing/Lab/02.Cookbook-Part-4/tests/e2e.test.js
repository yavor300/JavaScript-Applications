//@ts-check
const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
const mockData = require('./mock-data.json');

let browser;
let context;
let page;

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin:': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

describe('E2E tests', function () {
    this.timeout(6000);

    before(async () => {
        //browser = await chromium.launch({ headless: false, slowMo: 500 });
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();

        // block intensive resources and external calls (page routes take precedence)
        await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
        await context.route(url => {
            return url.hostname != 'localhost';
        }, route => route.abort());

        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('Catalog', function () {
        it('should load and display recipes', async function () {
            // mocking the response from the server
            await page.route('http://localhost:3030/data/recipes', (request) => request.fulfill(json(mockData.list)));

            await page.goto('http://localhost:3000');

            await page.waitForSelector('article');

            const titles = await page.$$eval('h2', titles => titles.map(t => t.textContent));
            expect(titles[0]).to.contains('Easy Lasagna');
            expect(titles[1]).to.contains('Grilled Duck Fillet');
            expect(titles[2]).to.contains('Roast Trout');
        });
    });

    describe('Authentication', function () {
        it('register should send correct request', async function () {
            const email = 'john@abv.bg';
            const password = '123123';
            await page.route('http://localhost:3030/users/register', route => route.fulfill(json({_id: '001', email, accessToken: 'AAA'})));

            await page.goto('http://localhost:3000');
            await page.click('text=Register');

            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);
            await page.fill('[name="rePass"]', password);

            const [request] = await Promise.all([
                page.waitForRequest(request => request.url().includes('/users/register') && request.method() === 'POST'),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());
            expect(postData.email).to.equal(email);
            expect(postData.password).to.equal(password);
        });

        it('login should send correct request', async function () {
            const email = 'john@abv.bg';
            const password = '123123';
            await page.route('http://localhost:3030/users/login', route => route.fulfill(json({_id: '001', email, accessToken: 'AAA'})));

            await page.goto('http://localhost:3000');
            await page.click('text=Login');

            await page.waitForSelector('form');

            await page.fill('[name="email"]', email);
            await page.fill('[name="password"]', password);

            const [request] = await Promise.all([
                page.waitForRequest(request => request.url().includes('/users/login') && request.method() === 'POST'),
                page.click('[type="submit"]')
            ]);

            const postData = JSON.parse(request.postData());
            expect(postData.email).to.equal(email);
            expect(postData.password).to.equal(password);
        });
    })
});
