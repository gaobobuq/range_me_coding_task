import {Page} from "puppeteer";

import TestHelpers from "./Helplers/TestHelpers";

const puppeteer = require('puppeteer');
const chai = require('chai');
const assert = chai.assert;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();
  await page.goto('http://localhost:3000/');
  await navigationPromise;


  TestHelpers.interactions(page, "inputText", `input[data-testid="input-search-keyword"]`, `abdulrazacksa`);

  TestHelpers.waitUntil(page, "disappear", 'div[data-testid="loading-result"]'); 

  TestHelpers.waitUntil(page, "appear", 'div[data-testid="flickr-data-items-wrapper"]'); 
  
  await page.waitForTimeout(2000);

  const elements = await page.$$('div[data-testid="author-name"]');
  assert.lengthOf(elements, 1);

  TestHelpers.interactions(page, "click", `a[data-testid="link-to-full-image"]`);
  await page.waitForTimeout(2000);

  await browser.close();
})();
