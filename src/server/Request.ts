export default class Request {
  #httpMethod: string = "";
  #version: string = "";
  #uri: string = "";
  #queryParams: Record<string, string> = {};
  #header: Record<string, string> = {};
  #body: Record<string, string> = {};

  constructor(request: string) {
    this.#parseToRequest(request);
  }

  #parseToRequest(request: string) {
    const [header, body] = request.split("\r\n\r\n");
    this.#parseHeader(header);
    this.#parseBody(body);
  }

  #parseHeader(header: string) {
    const headers = header.split("\r\n");
    this.#parseFirstLine(headers[0]);
    this.#parseHeaderInfo(headers.slice(1), this.#header);
  }

  #parseFirstLine(firstLine: string) {
    [this.#httpMethod, this.#uri, this.#version] = firstLine.split(" ");
    const queryParam = {};

    if (this.#uri.includes("?")) {
      this.#queryParams = this.#parseQueryParams(this.#uri, queryParam);
      this.#uri = this.#uri.substring(0, this.#uri.indexOf("?"));
    }
  }

  #parseQueryParams(uri: string, queryParam: Record<string, string>) {
    const queryParams = uri.substring(uri.indexOf("?") + 1);
    return queryParams
      .split("&")
      .map((params) => params.split("="))
      .reduce((paramObj: Record<string, string>, [key, value]) => {
        paramObj[key] = value;
        return paramObj;
      }, queryParam);
  }

  #parseHeaderInfo(headerInfos: string[], initialHeaderObj: Record<string, string>) {
    headerInfos
      .map((header) => header.split(":"))
      .reduce((reducerObj: Record<string, string>, [key, value]) => {
        reducerObj[key.trim()] = value.trim();
        return reducerObj;
      }, initialHeaderObj);
  }

  #parseBody(body: string) {
    if (body.length > 0) {
      this.#body = this.#queryStringToObject(body);
    } else {
      this.#body = {};
    }
  }

  #queryStringToObject(queryString: string) {
    return queryString
      .split("&")
      .map((entry) => entry.split("="))
      .reduce((result: Record<string, string>, [key, value]) => {
        result[key] = value;
        return result;
      }, {});
  }

  getRequestInfo() {
    return [this.#httpMethod, this.#uri, this.#version];
  }

  getRequestHeader() {
    return this.#header;
  }

  getQueryParams() {
    return this.#queryParams;
  }

  getBodyContent() {
    return this.#body;
  }
}
