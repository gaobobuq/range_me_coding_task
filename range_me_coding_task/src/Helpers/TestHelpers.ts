import { ReactWrapper } from 'enzyme';

class TestHelpers {
  public static checkTextValue = (wrapper: ReactWrapper, selector: string, value: string): void => {
    const textElement = wrapper.find(selector);
    expect(textElement.text()).toBe(value);
  };

  public static printWrapperContent = (wrapper: ReactWrapper): void => {
    console.log(wrapper.debug());
  };
}

export default TestHelpers;
