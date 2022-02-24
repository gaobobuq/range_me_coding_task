import { MediaRawData } from './RawData';

export default class MediaEntity {
  public m?: string;

  constructor(rawData: MediaRawData) {
    this.m = rawData.m;
  }
}
