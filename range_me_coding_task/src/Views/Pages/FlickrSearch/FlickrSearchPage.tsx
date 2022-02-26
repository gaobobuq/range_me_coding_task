import { CircularProgress, Pagination } from '@mui/material';
// @ts-ignore
import debounce from 'lodash.debounce';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import APIs from '../../../Apis/APIs';
import { ITEM_COUNT_PER_PAGE } from '../../../Constants';
import { ItemsEntity, JsonFlickrFeedEntity } from '../../../Models';
import FlickrItemComponent from '../../Components/FlickrItem/FlickrItemComponent';

import '../../frontend.scss';
import './FlickrSearchPage.scss';

/**
 * FlickrSearchPage Component
 * Page to search and display Flickr items
 */
function FlickrSearchPage() {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [flickrFeedData, setFlickrFeedData] = useState<JsonFlickrFeedEntity>();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // search flickr data event
  const fetchFlickrData = (keyword: string) => {
    const paginatedFlickrData = APIs.fetchFlickrData(keyword, currentPageIndex, ITEM_COUNT_PER_PAGE);
    setFlickrFeedData(paginatedFlickrData.jsonFlickrFeedEntity);
    setPageCount(paginatedFlickrData.pageCount);
    setIsLoadingData(false);
  };

  useEffect(() => {
    fetchFlickrData('');
  }, [currentPageIndex]);

  const debouncedSearch = useCallback(
    debounce((newSearchKeyword: string) => fetchFlickrData(newSearchKeyword), 1000),
    [],
  );

  const searchKeywordChanged = (newSearchKeyword: string) => {
    setSearchKeyword(newSearchKeyword);
    setCurrentPageIndex(1);
    setIsLoadingData(true);
    debouncedSearch(newSearchKeyword);
  };

  return (
    <div className="flickr-search-page">
      <Row>
        {/* search keyword input */}

        <Col md={12} sm={12}>
          <div className="search-box">
            <img className="search-icon" src="/search-icon.svg" alt="search-icon" />
            <input
              data-testid="input-search-keyword"
              className="input-search-keyword"
              placeholder="Search by author, tag or date"
              value={searchKeyword}
              onChange={event => {
                searchKeywordChanged(event.target.value);
              }}
            />
          </div>
        </Col>

        {/* display search result items */}
        {
          isLoadingData
            ? (
              <div data-testid="loading-result" className="loading-result">
                <CircularProgress size={80} />
                <div className="loading-text">Loading</div>
              </div>
            )
            : (
              <Col md={12} sm={12}>
                {flickrFeedData?.items?.length > 0 ? (
                  <div data-testid="flickr-data-items-wrapper" className="flickr-feed-items">
                    {flickrFeedData?.items?.map((item: ItemsEntity, index: number) => (
                      <FlickrItemComponent key={item.title ?? `${index}`} {...item} />
                    ))}

                    {
                        pageCount > 1
                        && (
                        <Pagination
                          data-testid="pagination"
                          className="pagination"
                          page={currentPageIndex}
                          count={pageCount}
                          variant="outlined"
                          shape="rounded"
                          onChange={(event: React.ChangeEvent<unknown>, page: number) => {
                            setCurrentPageIndex(page);
                          }}
                        />
                        )
                      }
                  </div>
                ) : (
                  <div data-testid="no-result-found" className="no-result-found">
                    <img
                      src="no-result-found.png"
                      alt="no results"
                    />
                  </div>
                )}
              </Col>
            )
        }
      </Row>
    </div>
  );
}

export default FlickrSearchPage;
