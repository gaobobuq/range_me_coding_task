import { Page } from 'puppeteer';

type InteractionType = 'click' | 'inputText';
type WaitType = 'appear' | 'disappear';

class ActionHelpers {
  public static interactions = async (page: Page, interactionType: InteractionType, selector: string, value?: string) => {
    switch (interactionType) {
      case 'inputText':
        await page.focus(selector);
        await page.keyboard.type(value ?? '');
        break;
      case 'click':
        await page.click(selector);
        break;
      default:
        console.error('Cannot found interaction type.');
        break;
    }
  };

  public static waitUntil = async (page: Page, waitType: WaitType, selector: string, additionalWait?: number) => {
    switch (waitType) {
      case 'appear':
        await page.waitForSelector(selector);
        if (additionalWait) {
          await page.waitForTimeout(additionalWait);
        }
        break;
      case 'disappear':
        await page.waitForSelector(selector, { hidden: true });
        if (additionalWait) {
          await page.waitForTimeout(additionalWait);
        }
        break;
      default:
        console.error('Cannot found wait type.');
        break;
    }
  };
}

export default ActionHelpers;
