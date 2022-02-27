import { Page } from 'puppeteer';
import ActionHelpers from './ActionHelpers';

/**
 * PageActionHelpers
 */
class PageActionHelpers {

  /**
   * inputKeywordAndWaitForResults
   *
   * input keyword into search box
   *
   * @param page target page
   * @param keyword input search keyword
   */
  public static inputKeywordAndWaitForResults = async (page: Page, keyword: string) => {
    await ActionHelpers.interactions(page, 'inputText', 'input[data-testid="input-search-keyword"]', keyword);
  };

  /**
   * waitUntilResultsLoaded
   *
   * wait until the items appear on the page
   *
   * @param page target page
   */
  public static waitUntilResultsLoaded = async (page: Page) => {
    await ActionHelpers.waitUntil(page, 'disappear', 'div[data-testid="loading-result"]');
    await ActionHelpers.waitUntil(page, 'appear', 'div[data-testid="flickr-data-items-wrapper"]');

    await page.waitForTimeout(2000);
  };

  /**
   * waitUntilNoResultsMessage
   *
   * wait until "no search results" message appears
   *
   * @param page target page
   */
  public static waitUntilNoResultsMessage = async (page: Page) => {
    await ActionHelpers.waitUntil(page, 'appear', 'div[data-testid="no-result-found"]');

    await page.waitForTimeout(2000);
  };
}

export default PageActionHelpers;
