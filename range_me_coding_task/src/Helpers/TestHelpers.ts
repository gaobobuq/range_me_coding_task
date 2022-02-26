import { ReactWrapper } from 'enzyme';

/**
 * TestHelpers
 */
class TestHelpers {
  /**
   * checkTextValue
   * check whether the text value is identical as expected
   * @param wrapper enzyme react wrapper
   * @param selector target text selector
   * @param expectedValue the expected value
   */
  public static checkTextValue = (wrapper: ReactWrapper, selector: string, expectedValue: string): void => {
    const textElement = wrapper.find(selector);
    expect(textElement.text()).toBe(expectedValue);
  };

  /**
   * printWrapperContent
   * print debug wrapper content for debugging only
   * @param wrapper the input wrapper
   */
  public static printWrapperContent = (wrapper: ReactWrapper): void => {
    console.log(wrapper.debug());
  };
}

export default TestHelpers;
