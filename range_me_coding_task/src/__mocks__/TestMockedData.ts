import { ItemsRawData, JsonFlickrFeedRawData } from '../Models/RawData';

export const itemsEntityRawData: ItemsRawData = {
  title: 'IMG_2481',
  link: 'https://www.flickr.com/photos/mickythepixel/51893643867/',
  media: {
    m: 'https://live.staticflickr.com/65535/51893643867_051d38f43e_m.jpg',
  },
  date_taken: '2022-02-19T12:08:25-08:00',
  description:
      ' <p><a href="https://www.flickr.com/people/mickythepixel/">micky the pixel</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/mickythepixel/51893643867/" title="IMG_2481"><img src="https://live.staticflickr.com/65535/51893643867_051d38f43e_m.jpg" width="230" height="240" alt="IMG_2481" /></a></p> ',
  published: '2022-02-21T09:23:45Z',
  author: 'nobody@flickr.com ("micky the pixel")',
  author_id: '7141646@N02',
  tags: 'buch book livre zeitschrift magazine verlagernstkeilsnachfolger diegartenlaube–illustriertesfamilienblatt diegartenlaube illustration wilhelmvonkaulbach reinekefuchs hinrichtung execution',
};

export const jsonFlickrFeedRawDataOneInstance: JsonFlickrFeedRawData = {
  title: 'Uploads from everyone',
  link: 'https://www.flickr.com/photos/',
  description: '',
  modified: '2022-02-21T09:23:41Z',
  generator: 'https://www.flickr.com',
  items: [
    {
      title: ' ',
      link: 'https://www.flickr.com/photos/192801292@N06/51893643787/',
      media: {
        m: 'https://live.staticflickr.com/65535/51893643787_c2269ca5d9_m.jpg',
      },
      date_taken: '2022-02-21T14:27:58-08:00',
      description:
                ' <p><a href="https://www.flickr.com/people/192801292@N06/">abdulrazacksa</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/192801292@N06/51893643787/" title=" "><img src="https://live.staticflickr.com/65535/51893643787_c2269ca5d9_m.jpg" width="240" height="195" alt=" " /></a></p> ',
      published: '2022-02-21T09:23:41Z',
      author: 'nobody@flickr.com ("abdulrazacksa")',
      author_id: '192801292@N06',
      tags: '',
    },
  ],
};

export const jsonFlickrFeedRawDataNoItems: JsonFlickrFeedRawData = {
  title: 'Uploads from everyone',
  link: 'https://www.flickr.com/photos/',
  description: '',
  modified: '2022-02-21T09:23:41Z',
  generator: 'https://www.flickr.com',
  items: [],
};
