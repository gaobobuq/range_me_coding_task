import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import APIs, { PaginatedFlickrData } from '../Apis/APIs';
import FlickrDataHelpers from '../Helpers/FlickrDataHelpers';
import flickrSampleData from '../MockedData/FlickrSampleData';
import { JsonFlickrFeedEntity } from '../Models';
import FlickrSearchPage from '../Views/Pages/FlickrSearch/FlickrSearchPage';
import { jsonFlickrFeedRawDataNoItems, jsonFlickrFeedRawDataOneInstance } from '../__mocks__/TestMockedData';

jest.mock('../Apis/APIs.ts');

/**
 * API mockups
 */
const mockFetchFlickrDataNoPagination = () => {
  (APIs.fetchFlickrData as jest.Mock).mockReturnValue({
    currentPageIndex: 1,
    pageCount: 1,
    jsonFlickrFeedEntity: new JsonFlickrFeedEntity(jsonFlickrFeedRawDataOneInstance),
  } as PaginatedFlickrData);
};

const mockFetchFlickrDataHasPagination = () => {
  (APIs.fetchFlickrData as jest.Mock).mockReturnValue({
    currentPageIndex: 1,
    pageCount: 2,
    jsonFlickrFeedEntity: new JsonFlickrFeedEntity(flickrSampleData),
  } as PaginatedFlickrData);
};

const mockFetchFlickrDataHasNoItems = () => {
  (APIs.fetchFlickrData as jest.Mock).mockReturnValue({
    currentPageIndex: 0,
    pageCount: 0,
    jsonFlickrFeedEntity: new JsonFlickrFeedEntity(jsonFlickrFeedRawDataNoItems),
  } as PaginatedFlickrData);
};

const mockFetchFlickrDataWith20Items = () => {
  (APIs.fetchFlickrData as jest.Mock).mockReturnValue({
    currentPageIndex: 1,
    pageCount: 4,
    jsonFlickrFeedEntity: new JsonFlickrFeedEntity(flickrSampleData),
  } as PaginatedFlickrData);
};

/**
 * Flickr Search Page Tests
 */
describe('(Tags: RMCT-004 FlickrSearchPage) Flickr Search Page Tests', () => {
  /**
   * Test scenarios
   */
  it('Flickr search page can be rendered', () => {
    mockFetchFlickrDataHasPagination();

    const wrapper = mount(
      <FlickrSearchPage />,
    );

    expect(wrapper).not.toBeNull();
  });

  it('One page should not have pagination', () => {
    mockFetchFlickrDataNoPagination();

    const wrapper = mount(
      <FlickrSearchPage />,
    );

    const paginationComponent = wrapper.find('*[data-testid="pagination"]');
    expect(paginationComponent.length).toBe(0);
  });

  it('Data items can be displayed on the page', () => {
    mockFetchFlickrDataWith20Items();

    const wrapper = mount(
      <FlickrSearchPage />,
    );

    const elements = wrapper.find('div[data-testid="author-name"]');

    // get mocked data items
    const jsonFlickrFeed = new JsonFlickrFeedEntity(flickrSampleData);

    // for each data item, we check whether the author's name is displayed on the page by index order
    elements.forEach((element: ReactWrapper, index: number) => {
      expect(element.text()).toBe(FlickrDataHelpers.extractAuthorName(jsonFlickrFeed.items[index].author));
    });
  });

  it('More than one pages should have pagination', () => {
    mockFetchFlickrDataHasPagination();

    const wrapper = mount(
      <FlickrSearchPage />,
    );

    // need to use timer to check after a short time, since initial isLoading state is true
    setTimeout(() => {
      wrapper.update();
      const paginationComponent = wrapper.find('*[data-testid="pagination"]');
      expect(paginationComponent.length).not.toBe(0);
    }, 100);
  });

  it('Search result has no items', () => {
    mockFetchFlickrDataHasNoItems();

    const wrapper = mount(
      <FlickrSearchPage />,
    );

    // need to use timer to check after a short time, since initial isLoading state is true
    setTimeout(() => {
      wrapper.update();
      const noResultFoundComponent = wrapper.find('*[data-testid="no-result-found"]');
      expect(noResultFoundComponent.length).toBe(1);
    }, 100);
  });
});
