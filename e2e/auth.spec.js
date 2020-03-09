const puppeteer = require('puppeteer');
const { expect } = require('chai');

let browser;
let page;

describe('Auth Test', function () {

  before(async function () {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 10
    });
    page = await browser.newPage();
    return await page.goto('http://localhost:8081/login');
  });

  after(async function () {
    return await browser.close();
  });

  it('should allow to type email', async function () {
    await page.goto('http://localhost:8081/login');
    await page.type('input[name="email"]', 'antonboksha@gmail.com');
    await page.type('input[name="password"]', 'testpass');

    await Promise.all([
      page.waitForNavigation({timeout:0}),
      page.click('button[type="submit"]'),
    ]);
    let title = await page.evaluate(() => document.querySelector('.title').innerHTML);
    expect(title).to.eql('Planets');
  });

  it('should open films page with correct title', async function () {
    await Promise.all([
      page.goto('http://localhost:8081/films', {timeout:0}),
      page.waitForNavigation({timeout:0}),
    ]);
    let title = await page.evaluate(() => document.querySelector('.title').innerHTML);
    expect(title).to.eql('Films');
  });
});
