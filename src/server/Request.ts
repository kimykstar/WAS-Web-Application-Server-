class Request {
  #httpMethod;
  #version: string;
  #uri: string;
  #queryParams: Record<string, string>;
  #header: Record<string, string>;
  #body: Record<string, string>;

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
  }

  #parseFirstLine(firstLine: string) {
    const { method, path, version } = firstLine.split(" ");

    if (path.includes("?")) {
      this.#getQueryParams(path);
    }
  }

  #getQueryParams(uri: string) {
    const queryParams = uri.substring(uri.search("?") + 1);
    const queryParam = queryParams
      .split("&")
      .map((params) => params.split("="))
      .reduce((paramObj: Record<string, string>, [key, value]) => {
        paramObj[key] = value;
        return paramObj;
      }, {});
    return queryParam;
  }

  #parseBody(body: string) {}
}
