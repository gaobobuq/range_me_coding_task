class FlickrDataHelpers {
  public static extractAuthorName = (authorString?: string): string => {
    return !!authorString
      ? authorString.substring(authorString.indexOf('("') + 2, authorString.lastIndexOf('")')).trim()
      : '';
  };

  public static extractAuthorEmail = (authorString?: string): string => {
    return !!authorString
      ? authorString.substring(0, authorString.lastIndexOf('("')).trim()
      : '';
  };
}

export default FlickrDataHelpers;
