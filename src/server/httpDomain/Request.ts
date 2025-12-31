import Cookie from "./Cookie.ts";
import RequestBody from "./RequestBody.ts";

export default class Request {
  private httpMethod: string = "";
  private version: string = "";
  private uri: string = "";
  private queryParams: Record<string, string> = {};
  private header: Record<string, string> = {};
  private cookies: Cookie = new Cookie();
  private body: Record<string, string> = {};
  private multipartBody: Array<Record<string, string | Buffer>> = [];

  constructor(request: Buffer) {
    this.parseToRequest(request);
  }

  private parseToRequest(request: Buffer) {
    const splitIndex = request.indexOf("\r\n\r\n");
    const header = request.slice(0, splitIndex).toString();
    const body = request.slice(splitIndex + 4);
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
        if (cookie.startsWith("SID=")) {
          return cookie.split("=")[1];
        }
      }
    }

    return null;
  }

  private isExistCookieHeader() {
    const cookie = this.getRequestHeader("Cookie");
    if (cookie) return true;
    return false;
  }

  private parseBody(body: Buffer) {
    const contentType = this.getRequestHeader("Content-Type");
    if (contentType?.includes("multipart/form-data;")) {
      const boundary = `--${contentType.substring(contentType.indexOf("=") + 1)}`;
      const parts = new RequestBody().parseMultipartBody(boundary, body);
      this.multipartBody = parts;
    }
    if (body.length > 0) {
      const bodyContent = body.toString();
      this.parseQueryParams(bodyContent, this.body);
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

  getMultipartBody() {
    return this.multipartBody;
  }

  getCookie() {
    return this.cookies;
  }
}
