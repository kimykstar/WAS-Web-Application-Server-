export default class Request {
  private httpMethod: string = "";
  private version: string = "";
  private uri: string = "";
  private queryParams: Record<string, string> = {};
  private header: Record<string, string> = {};
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
  }

  private parseFirstLine(firstLine: string) {
    [this.httpMethod, this.uri, this.version] = firstLine.split(" ");
    const queryParam = {};

    if (this.uri.includes("?")) {
      this.queryParams = this.parseQueryParams(this.uri, queryParam);
      this.uri = this.uri.substring(0, this.uri.indexOf("?"));
    }
  }

  private parseQueryParams(uri: string, queryParam: Record<string, string>) {
    const queryParams = uri.substring(uri.indexOf("?") + 1);
    return queryParams
      .split("&")
      .map((params) => params.split("="))
      .reduce((paramObj: Record<string, string>, [key, value]) => {
        paramObj[key] = value;
        return paramObj;
      }, queryParam);
  }

  private parseHeaderInfo(headerInfos: string[]) {
    headerInfos
      .map((header) => header.split(":"))
      .reduce((reducerObj: Record<string, string>, [key, value]) => {
        reducerObj[key.trim()] = value.trim();
        return reducerObj;
      }, this.header);
  }

  private parseBody(body: string) {
    if (body.length > 0) {
      this.body = this.queryStringToObject(body);
    } else {
      this.body = {};
    }
  }

  private queryStringToObject(queryString: string) {
    return queryString
      .split("&")
      .map((entry) => entry.split("="))
      .reduce((result: Record<string, string>, [key, value]) => {
        result[key] = value;
        return result;
      }, {});
  }

  getRequestInfo() {
    return [this.httpMethod, this.uri, this.version];
  }

  getRequestHeader() {
    return this.header;
  }

  getQueryParams() {
    return this.queryParams;
  }

  getBodyContent() {
    return this.body;
  }
}
