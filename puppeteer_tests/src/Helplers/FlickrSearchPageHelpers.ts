import {Page} from "puppeteer";
import ActionHelpers from "./ActionHelpers";

class PageActionHelpers {
    public static inputKeywordAndWaitForResults = async (page: Page, keyword: string) => {
        await ActionHelpers.interactions(page, "inputText", `input[data-testid="input-search-keyword"]`, keyword);
    }

    public static waitUntilResultsLoaded = async (page: Page) => {
        await ActionHelpers.waitUntil(page, "disappear", 'div[data-testid="loading-result"]');
        await ActionHelpers.waitUntil(page, "appear", 'div[data-testid="flickr-data-items-wrapper"]');

        await page.waitForTimeout(2000);
    }

    public static waitUntilNoResultsMessage = async (page: Page) => {
        await ActionHelpers.waitUntil(page, "appear", 'div[data-testid="no-result-found"]');

        await page.waitForTimeout(2000);
    }
}

export default PageActionHelpers;
