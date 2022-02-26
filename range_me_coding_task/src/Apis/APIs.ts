import flickrSampleData from '../MockedData/FlickrSampleData';
import { JsonFlickrFeedEntity } from '../Models';

/**
 * PaginatedFlickrData interface
 */
export interface PaginatedFlickrData {
  pageCount: number;
  currentPageIndex: number;
  jsonFlickrFeedEntity: JsonFlickrFeedEntity;
}

/**
 * APIs class
 *
 * api collection of the application
 */
export default class APIs {
  /**
   * fetch flickr data method
   * get request to fetch flickr data
   * @param searchKeyword {string} the input searchKeyword text
   * @param currentPageIndex {number} current page index
   * @param itemCountPerPage {number} number of items displayed per page
   */
  static fetchFlickrData = (searchKeyword: string, currentPageIndex: number, itemCountPerPage: number): PaginatedFlickrData => {
    const filteredItems = flickrSampleData.items?.filter(e => {
      return e.author?.includes(searchKeyword)
            || e.tags?.includes(searchKeyword)
            || (
              e.date_taken && new Date(e.date_taken).toUTCString().includes(searchKeyword)
            );
    });

    const items = filteredItems ? filteredItems.slice((currentPageIndex - 1) * itemCountPerPage, currentPageIndex * itemCountPerPage) : [];
    const parsedJsonFlickrFeedEntity = new JsonFlickrFeedEntity({
      ...flickrSampleData,
      items,
    });

    return {
      currentPageIndex: currentPageIndex,
      pageCount: filteredItems ? Math.ceil(filteredItems.length / itemCountPerPage) : 1,
      jsonFlickrFeedEntity: parsedJsonFlickrFeedEntity,
    };
  };
}
