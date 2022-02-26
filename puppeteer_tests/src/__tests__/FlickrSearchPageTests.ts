import { Page } from 'puppeteer';
import PageActionHelpers from '../Helplers/FlickrSearchPageHelpers';
import ActionHelpers from '../Helplers/ActionHelpers';
import {APPLICATION_BASE_URL, HEADERLESS, ITEM_COUNT_PER_PAGE} from '../Constants';

const puppeteer = require('puppeteer');
const chai = require('chai');

const { assert } = chai;

/**
 * Flickr data search page tests
 */
describe('Flickr Data Search Page Tests', () => {
  let page: Page;
  let browser: any;

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: HEADERLESS });
    page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();
    await page.goto(APPLICATION_BASE_URL);
    await navigationPromise;
  });

  afterEach(async () => {
    browser.close();
  });

  /**
   * Test scenarios
   */
  it(`Empty search keyword should return first page with ${ITEM_COUNT_PER_PAGE} items`, async () => {
    await PageActionHelpers.waitUntilResultsLoaded(page);

    const elements = await page.$$('div[data-testid="author-name"]');
    assert.lengthOf(elements, ITEM_COUNT_PER_PAGE);
  });

  it('Search for one item by author name', async () => {
    await PageActionHelpers.inputKeywordAndWaitForResults(page, 'abdulrazacksa');
    await PageActionHelpers.waitUntilResultsLoaded(page);

    const elements = await page.$$('div[data-testid="author-name"]');
    assert.lengthOf(elements, 1);

    await ActionHelpers.interactions(page, 'click', 'a[data-testid="link-to-full-image"]');
  });

  it('Search Flickr data and return no results', async () => {
    await PageActionHelpers.inputKeywordAndWaitForResults(page, 'abc');
    await PageActionHelpers.waitUntilNoResultsMessage(page);

    const elements = await page.$$('div[data-testid="author-name"]');
    assert.lengthOf(elements, 0);
  });
});
