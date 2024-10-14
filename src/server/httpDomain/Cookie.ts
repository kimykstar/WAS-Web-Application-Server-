export default class Cookie {
  private attribute: Record<string, string> = {};

  constructor() {}

  setAttribute(attrs: string) {
    attrs
      .split("; ")
      .map((attr) => attr.split("="))
      .reduce((attrReducer, [key, value]) => {
        attrReducer[key] = value;
        return attrReducer;
      }, this.attribute);
  }

  getCookieValue(key: string) {
    return this.attribute[key];
  }
}
