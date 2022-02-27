import chai from 'chai';
import puppeteer, {Browser, Page} from 'puppeteer';
import ActionHelpers from '../Helplers/ActionHelpers';
import PageActionHelpers from '../Helplers/FlickrSearchPageHelpers';
import {APPLICATION_BASE_URL, HEADERLESS, ITEM_COUNT_PER_PAGE} from '../Constants';

/**
 * Flickr data search page tests
 */
describe('Flickr Data Search Page Tests', () => {
  let page: Page;
  let browser: Browser;
  const { assert } = chai;
  jest.setTimeout(60000);

  beforeEach(async () => {
    browser = await puppeteer.launch({
      args: [
        '--disable-web-security',
      ],
      headless: HEADERLESS
    });
    page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();
    await page.goto(APPLICATION_BASE_URL);
    await navigationPromise;
  });

  afterEach(async () => {
    await browser.close();
  });

  /**
   * Test scenarios
   */
  it(`Empty search keyword should return first page with ${ITEM_COUNT_PER_PAGE} items`, async () => {
    await PageActionHelpers.waitUntilResultsLoaded(page);

    const elements = await page.$$('div[data-testid="author-name"]');
    assert.lengthOf(elements, ITEM_COUNT_PER_PAGE);
  });

  it('Search by tag', async () => {
    await PageActionHelpers.inputKeywordAndWaitForResults(page, 'bird');
    await PageActionHelpers.waitUntilResultsLoaded(page);

    const elements = await page.$$('div[data-testid="tags"]');
    assert.lengthOf(elements, ITEM_COUNT_PER_PAGE);

    await ActionHelpers.interactions(page, 'click', 'a[data-testid="link-to-full-image"]');
  });

  it('Search Flickr data and return no results', async () => {
    await PageActionHelpers.inputKeywordAndWaitForResults(page, 'This should not return anything');
    await PageActionHelpers.waitUntilNoResultsMessage(page);

    const elements = await page.$$('div[data-testid="author-name"]');
    assert.lengthOf(elements, 0);
  });
});
