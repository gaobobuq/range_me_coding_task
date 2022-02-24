import * as React from 'react';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-grid-system';
import flickrSampleData from '../../../MockedData/FlickrSampleData';
import { ItemsEntity, JsonFlickrFeedEntity } from '../../../Models';
import FlickrItemComponent from '../../Components/FlickrItem/FlickrItemComponent';
import '../../frontend.scss';

function FlickrSearchPage() {
  const [flickrFeedData, setFlickrFeedData] = useState<JsonFlickrFeedEntity>();

  // search flickr data event
  const fetchFlickrData = (keyword: string) => {
    const parsedJsonFlickrFeedEntity = new JsonFlickrFeedEntity(flickrSampleData);

    setFlickrFeedData(parsedJsonFlickrFeedEntity);
  };

  useEffect(() => {
    fetchFlickrData('');
  }, []);

  return (
    <div className="flickr-search-page">
      <Row>
        <Col md={12} sm={12}>
          {flickrFeedData && flickrFeedData.items?.length > 0 ? (
            <div data-testid="flickr-data-items-wrapper" className="flickr-feed-items">
              {flickrFeedData?.items?.map((item: ItemsEntity, index: number) => (
                <FlickrItemComponent key={item.title ?? `${index}`} {...item} />
              ))}
            </div>
          ) : (
            <div className="no-result-found">
              <img
                data-testid="no-result-found"
                src="no-result-found.png"
                alt="no results"
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default FlickrSearchPage;
