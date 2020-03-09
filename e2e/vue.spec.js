const puppeteer = require('puppeteer');
const { expect } = require('chai');

describe('my app', function() {
  let browser;
  let page;

  before(async function() {
    this.timeout(10000);

    // Launch Puppeteer and navigate to the Express server
    browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    page = await browser.newPage();
    await page.goto('http://localhost:8080/vue.html');
  });

  after(async function() {
    browser.close();
  });

  it('displays the current page', async function() {
    this.timeout(3000);


    // Click on the "Home" link and make sure "Home" shows up
    // await page.evaluate(() => document.querySelector('a[href="#/home"]').click());
    await page.click('a[href="#/home"]');
    let content = await page.evaluate(() => document.querySelector('#route').innerHTML);
    await expect(content).to.equal('<h1>Home</h1>');

    // Click on the "About" link and make sure "About Us" shows up
    await page.click('a[href="#/about"]').catch(()=> console.log('error'));
    content = await page.evaluate(() => document.querySelector('#route').innerHTML);
    // expect(content).to.equal('<h1>About Us</h1>');
    // assert.equal(content, '<h1>Home</h1>');

  });
});
