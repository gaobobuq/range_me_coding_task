import * as Models from '.';
import { ItemsEntity } from '.';
import { JsonFlickrFeedRawData } from './RawData';

export default class JsonFlickrFeedEntity {
  public title?: string;
  public link?: string;
  public description?: string;
  public modified?: Date;
  public generator?: string;
  public items: ItemsEntity[] = [];

  constructor(rawData: JsonFlickrFeedRawData) {
    this.title = rawData.title;
    this.link = rawData.link;
    this.description = rawData.description;

    if (rawData.modified) {
      this.modified = new Date(rawData.modified);
    }

    this.generator = rawData.generator;

    this.items = [];
    rawData.items?.forEach(itemRawData => {
      this.items.push(new ItemsEntity(itemRawData));
    });
  }
}
