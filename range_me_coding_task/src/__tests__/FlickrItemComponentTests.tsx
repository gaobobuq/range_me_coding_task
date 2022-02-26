import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import FlickrDataHelpers from '../Helpers/FlickrDataHelpers';
import TestHelpers from '../Helpers/TestHelpers';
import { ItemsEntity } from '../Models';
import FlickrItemComponent from '../Views/Components/FlickrItem/FlickrItemComponent';
import { itemsEntityRawData } from '../__mocks__/TestMockedData';

/**
 * Flickr Item Component Tests
 */
describe('(Tags: RMCT-004 FlickrItem) Flickr Item Component Tests', () => {
  it('FlickrItem component can be rendered', () => {
    const itemsEntity = new ItemsEntity(itemsEntityRawData);

    const wrapper = mount(
      <FlickrItemComponent {...itemsEntity} />,
    );

    expect(wrapper).not.toBeNull();
  });

  /**
   * Test scenarios
   */
  it('FlickrItem component elements have expected values', () => {
    const itemsEntity = new ItemsEntity(itemsEntityRawData);

    const wrapper = mount(
      <FlickrItemComponent {...itemsEntity} />,
    );

    // check author name value
    TestHelpers.checkTextValue(wrapper, 'div[data-testid="author-name"]', FlickrDataHelpers.extractAuthorName(itemsEntity.author));

    // check author email value
    TestHelpers.checkTextValue(wrapper, 'div[data-testid="author-email"]', FlickrDataHelpers.extractAuthorEmail(itemsEntity.author));

    // check date taken value
    TestHelpers.checkTextValue(wrapper, 'div[data-testid="date-taken"]', itemsEntity.dateTaken.toUTCString());

    // check tags value
    TestHelpers.checkTextValue(wrapper, 'div[data-testid="tags"]', itemsEntity.tags);

    // check full image link
    const linkElement = wrapper.find('a[data-testid="link-to-full-image"]');
    expect(linkElement.prop('href')).toBe(itemsEntity.link);

    expect(wrapper).not.toBeNull();
  });

  it('Check FlickrItem component details using snapshot', () => {
    const itemsEntity = new ItemsEntity(itemsEntityRawData);

    const renderDetails = renderer
      .create(<FlickrItemComponent {...itemsEntity} />)
      .toJSON();

    expect(renderDetails).toMatchSnapshot();
  });
});
