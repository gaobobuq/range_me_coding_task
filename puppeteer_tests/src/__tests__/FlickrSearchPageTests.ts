import { Page } from 'puppeteer';
import PageActionHelpers from '../Helplers/FlickrSearchPageHelpers';
import ActionHelpers from '../Helplers/ActionHelpers';
import { ITEM_COUNT_PER_PAGE } from '../Constants';

const puppeteer = require('puppeteer');
const chai = require('chai');

const { assert } = chai;

describe('Flickr Data Search Page Tests', () => {
  let page: Page;
  let browser: any;

  beforeEach(async () => {
    jest.setTimeout(60000);
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();
    await page.goto('http://localhost:3005/');
    await navigationPromise;
  });

  afterEach(async () => {
    browser.close();
  });

  it(`Loaded search page without keyword should return first page with ${ITEM_COUNT_PER_PAGE} items`, async () => {
    await PageActionHelpers.waitUntilResultsLoaded(page);

    const elements = await page.$$('div[data-testid="author-name"]');
    assert.lengthOf(elements, ITEM_COUNT_PER_PAGE);

    await page.waitForTimeout(500);
  });

  it('Search for one item by author name', async () => {
    await PageActionHelpers.inputKeywordAndWaitForResults(page, 'abdulrazacksa');
    await PageActionHelpers.waitUntilResultsLoaded(page);

    const elements = await page.$$('div[data-testid="author-name"]');
    assert.lengthOf(elements, 1);

    await ActionHelpers.interactions(page, 'click', 'a[data-testid="link-to-full-image"]');
    await page.waitForTimeout(500);
  });

  it('Search Flickr data and return no results', async () => {
    await PageActionHelpers.inputKeywordAndWaitForResults(page, 'abc');
    await PageActionHelpers.waitUntilNoResultsMessage(page);

    const elements = await page.$$('div[data-testid="author-name"]');
    assert.lengthOf(elements, 0);

    await page.waitForTimeout(500);
  });
});
