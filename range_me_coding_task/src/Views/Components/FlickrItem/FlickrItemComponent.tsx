import * as React from 'react';
import { Col, Row } from 'react-grid-system';
import { ItemsEntity } from '../../../Models';
import '../../frontend.scss';
import FlickrDataHelpers from '../../../Helpers/FlickrDataHelpers';

function FlickrItemComponent({
  media, author, dateTaken, tags, link,
}: ItemsEntity) {
  return (
    <div className="data-item paper text-base-style">
      <Row>
        <Col md={4} sm={12}>
          {/* image thumbnail */}

          <img
            className="media-image"
            src={media?.m}
            alt={author}
            onError={(e: any) => { e.target.src = 'no-image-placeholder.png'; }}
          />
        </Col>

        <Col md={8} sm={12}>
          {/* author name */}
          <div className="paragraph author" data-testid="author-name">{FlickrDataHelpers.extractAuthorName(author)}</div>

          {/* author email */}
          <div className="paragraph" data-testid="author-email">{FlickrDataHelpers.extractAuthorEmail(author)}</div>

          {/* date taken */}
          <div className="label" data-testid="date-taken">{dateTaken?.toUTCString()}</div>

          {/* tags */}
          <div className="tags" data-testid="tags">{tags}</div>

          {/* link to full image */}
          <div>
            <a className="link" data-testid="link-to-full-image" href={link}>
              View Full Image
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FlickrItemComponent;
