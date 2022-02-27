import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import APIs, { PaginatedFlickrData } from '../Apis/APIs';
import FlickrDataHelpers from '../Helpers/FlickrDataHelpers';
import { JsonFlickrFeedEntity } from '../Models';
import FlickrSearchPage from '../Views/Pages/FlickrSearch/FlickrSearchPage';
import { jsonFlickrFeedRawData20Instances, jsonFlickrFeedRawDataNoItems, jsonFlickrFeedRawDataOneInstance } from '../__mocks__/TestMockedData';
import { act } from '@testing-library/react';

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
    jsonFlickrFeedEntity: new JsonFlickrFeedEntity(jsonFlickrFeedRawData20Instances),
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
    jsonFlickrFeedEntity: new JsonFlickrFeedEntity(jsonFlickrFeedRawData20Instances),
  } as PaginatedFlickrData);
};

/**
 * Flickr Search Page Tests
 */
describe('(Tags: RMCT-004 FlickrSearchPage) Flickr Search Page Tests', () => {
  /**
   * Test scenarios
   */
  it('Flickr search page can be rendered', async () => {
    mockFetchFlickrDataHasPagination();

    let wrapper: ReactWrapper;
    await act(async () => {
      wrapper = mount(
        <FlickrSearchPage />,
      );
    });

    expect(wrapper).not.toBeNull();
  });

  it('One page should not have pagination', async () => {
    mockFetchFlickrDataNoPagination();

    let wrapper: ReactWrapper;
    await act(async () => {
      wrapper = mount(
        <FlickrSearchPage />,
      );
    });

    const paginationComponent = wrapper.find('*[data-testid="pagination"]');
    expect(paginationComponent.length).toBe(0);
  });

  it('Data items can be displayed on the page', async () => {
    mockFetchFlickrDataWith20Items();

    let wrapper: ReactWrapper;
    await act(async () => {
      wrapper = mount(
        <FlickrSearchPage />,
      );
    });

    const elements = wrapper.find('div[data-testid="author-name"]');

    // get mocked data items
    const jsonFlickrFeed = new JsonFlickrFeedEntity(jsonFlickrFeedRawData20Instances);

    // for each data item, we check whether the author's name is displayed on the page by index order
    elements.forEach((element: ReactWrapper, index: number) => {
      expect(element.text()).toBe(FlickrDataHelpers.extractAuthorName(jsonFlickrFeed.items[index].author));
    });
  });

  it('More than one pages should have pagination', async () => {
    mockFetchFlickrDataHasPagination();

    let wrapper: ReactWrapper;
    await act(async () => {
      wrapper = mount(
        <FlickrSearchPage />,
      );
    });

    // need to check in next tick, since initial isLoading state is true
    await Promise.resolve();

    wrapper.update();
    const paginationComponent = wrapper.find('*[data-testid="pagination"]');
    expect(paginationComponent.length).not.toBe(0);
  });

  it('Search result has no items', async () => {
    mockFetchFlickrDataHasNoItems();

    let wrapper: ReactWrapper;
    await act(async () => {
      wrapper = mount(
        <FlickrSearchPage />,
      );
    });

    // need to check in next tick, since initial isLoading state is true
    wrapper.update();
    const noResultFoundComponent = wrapper.find('*[data-testid="no-result-found"]');
    expect(noResultFoundComponent.length).toBe(1);
  });
});
