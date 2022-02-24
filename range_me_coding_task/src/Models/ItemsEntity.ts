import { MediaEntity } from '.';
import { ItemsRawData } from './RawData';

export default class ItemsEntity {
  public title?: string;
  public link?: string;
  public media?: MediaEntity;
  public dateTaken?: Date;
  public description?: string;
  public published?: Date;
  public author?: string;
  public authorId?: string;
  public tags?: string;

  constructor(rawData: ItemsRawData) {
    this.title = rawData.title;
    this.link = rawData.link;

    if (rawData.media) {
      this.media = new MediaEntity(rawData.media);
    }

    if (rawData.date_taken) {
      this.dateTaken = new Date(rawData.date_taken);
    }

    this.description = rawData.description;

    if (rawData.published) {
      this.published = new Date(rawData.published);
    }

    this.author = rawData.author;
    this.authorId = rawData.author_id;
    this.tags = rawData.tags;
  }
}
