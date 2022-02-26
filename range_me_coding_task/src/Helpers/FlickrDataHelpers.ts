/**
 * FlickrDataHelpers
 */
class FlickrDataHelpers {
  /**
   * extractAuthorName
   * extract author name string from given author
   * @param authorString input author information string
   */
  public static extractAuthorName = (authorString?: string): string => {
    return !!authorString
      ? authorString.substring(authorString.indexOf('("') + 2, authorString.lastIndexOf('")')).trim()
      : '';
  };

  /**
   * extractAuthorEmail
   * extract author email string from given author
   * @param authorString input author information string
   */
  public static extractAuthorEmail = (authorString?: string): string => {
    return !!authorString
      ? authorString.substring(0, authorString.lastIndexOf('("')).trim()
      : '';
  };
}

export default FlickrDataHelpers;
