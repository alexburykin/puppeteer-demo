const puppeteer = require('puppeteer');
const { expect } = require('chai');


let browser;

// puppeteer options
const opts = {
  headless: false,
  slowMo: 100,
  timeout: 10000
};

before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
});

after (function () {
  global.browser.close();
});
