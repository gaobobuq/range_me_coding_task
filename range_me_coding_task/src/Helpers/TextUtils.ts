/**
 * TextUtils
 */
class TextUtils {
  /**
   * processTags
   * separate tags string by spaces and commas, then join it by commas
   * @param inputString input tag string
   */
  public static processTags = (inputString: string): string => {
    return inputString.split(/[ ,]+/).join(',');
  };
}

export default TextUtils;
