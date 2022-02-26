import { Page } from 'puppeteer';

type InteractionType = 'click' | 'inputText';
type WaitType = 'appear' | 'disappear';

/**
 * ActionHelpers
 *
 * Test actions utils to perform interactions and waits
 */
class ActionHelpers {

  /**
   * interactions
   *
   * interactions with web elements including input text and click on elements
   *
   * @param page the target page object
   * @param interactionType interaction type of action
   * @param selector the selector string for the target element
   * @param value the new value of input
   */
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

  /**
   * waitUntil
   *
   * wait until the target elements appear or disappear
   *
   * @param page the target page object
   * @param waitType wait until the target appear or disappear
   * @param selector the selector string for the target element
   * @param additionalWait additional waiting time after action
   */
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
