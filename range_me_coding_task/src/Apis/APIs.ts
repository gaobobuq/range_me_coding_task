import flickrSampleData from '../MockedData/FlickrSampleData';
import { JsonFlickrFeedEntity } from '../Models';
import axios from 'axios';
import { JsonFlickrFeedRawData } from '../Models/RawData';

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
  static fetchFlickrData = async (searchKeyword: string, currentPageIndex: number, itemCountPerPage: number) => {
    const fetchDataUrl = `https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&tags=${searchKeyword}`;

    await axios.get<JsonFlickrFeedRawData>(fetchDataUrl)
      .then(response => {
        const filteredItems = response.data.items;
        console.log('return data');
        console.log(filteredItems);

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
      });
  };
}
