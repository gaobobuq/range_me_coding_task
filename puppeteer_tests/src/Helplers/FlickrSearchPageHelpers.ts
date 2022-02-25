import {Page} from "puppeteer";
import ActionHelpers from "./ActionHelpers";

class PageActionHelpers {
    public static inputKeywordAndWaitForResults = async (page: Page, keyword: string) => {
        await ActionHelpers.interactions(page, "inputText", `input[data-testid="input-search-keyword"]`, keyword);
        await PageActionHelpers.waitUntilResultsLoaded(page);
    }

    public static waitUntilResultsLoaded = async (page: Page) => {
        await ActionHelpers.waitUntil(page, "disappear", 'div[data-testid="loading-result"]');
        await ActionHelpers.waitUntil(page, "appear", 'div[data-testid="flickr-data-items-wrapper"]');

        await page.waitForTimeout(2000);
    }
}

export default PageActionHelpers;
