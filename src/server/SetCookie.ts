export default class SetCookie {
  private dataKey: string = "";
  private dataValue: string = "";
  private options: Record<string, string> = {};

  constructor() {}

  setCookieData(key: string, value: string) {
    this.dataKey = key;
    this.dataValue = value;

    return this;
  }

  setCookieAttr(key: string, value: string = "") {
    this.options[key] = value;

    return this;
  }

  getSetCookieHeaderValue() {
    const options = Object.entries(this.options)
      .map(([key, value]) => (value ? `${key}=${value}` : key))
      .join("; ");
    return `${this.dataKey}=${this.dataValue}; ${options}`;
  }
}
