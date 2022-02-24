import { ItemsRawData } from '.';

export default class JsonFlickrFeedRawData {
  public title?: string;
  public link?: string;
  public description?: string;
  public modified?: string;
  public generator?: string;
  public items?: ItemsRawData[] = [];
}
