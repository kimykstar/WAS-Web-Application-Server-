import Cookie from "../server/Cookie.ts";

export default class Request {
  private httpMethod: string = "";
  private version: string = "";
  private uri: string = "";
  private queryParams: Record<string, string> = {};
  private header: Record<string, string> = {};
  private cookies: Cookie = new Cookie();
  private body: Record<string, string> = {};

  constructor(request: string) {
    this.parseToRequest(request);
  }

  private parseToRequest(request: string) {
    const [header, body] = request.split("\r\n\r\n");
    this.parseHeader(header);
    this.parseBody(body);
  }

  private parseHeader(header: string) {
    const headers = header.split("\r\n");
    this.parseFirstLine(headers[0]);
    this.parseHeaderInfo(headers.slice(1));
    this.parseCookie();
  }

  private parseFirstLine(firstLine: string) {
    [this.httpMethod, this.uri, this.version] = firstLine.split(" ");

    if (this.uri.includes("?")) {
      this.parseQueryParams(this.uri.substring(this.uri.indexOf("?") + 1), this.queryParams);
      this.uri = this.uri.substring(0, this.uri.indexOf("?"));
    }
  }

  private parseQueryParams(uri: string, queryParamObj: Record<string, string>) {
    const queryParams = uri.substring(uri.indexOf("?") + 1);
    queryParams
      .split("&")
      .map((params) => params.split("="))
      .reduce((paramObj: Record<string, string>, [key, value]) => {
        paramObj[key] = value;
        return paramObj;
      }, queryParamObj);
  }

  private parseCookie() {
    if (this.header["Cookie"]) {
      const cookieValues: string = this.header["Cookie"];
      this.cookies.setAttribute(cookieValues);
    }
  }

  private parseHeaderInfo(headerInfos: string[]) {
    headerInfos
      .map((header) => header.split(":"))
      .reduce((reducerObj: Record<string, string>, [key, value]) => {
        reducerObj[key.trim()] = value.trim();
        return reducerObj;
      }, this.header);
    this.setSessionId();
  }

  private setSessionId() {
    if (this.isExistCookieHeader()) {
      const cookies = this.getRequestHeader("Cookie")?.split("; ");
      for (const cookie of cookies) {
        if (cookie.startsWith("session_id=")) {
          return cookie.split("=")[1];
        }
      }
    }

    return null;
  }

  private isExistCookieHeader() {
    const cookie = this.getRequestHeader("Cookie");
    if (cookie) return cookie;
    return undefined;
  }

  private parseBody(body: string) {
    if (body.length > 0) {
      this.parseQueryParams(body, this.body);
    }
  }

  getRequestInfo() {
    return [this.httpMethod, this.uri, this.version];
  }

  getRequestHeader(key: string) {
    return this.header[key];
  }

  getQueryParams() {
    return this.queryParams;
  }

  getBodyContent() {
    return this.body;
  }

  getCookie() {
    return this.cookies;
  }
}
