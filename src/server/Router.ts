import { DuplicateApiException } from "../exception/LogicException.ts";

class Router {
  private readonly apis: Record<
    string,
    Map<RegExp, (queryParams?: Record<string, string>, authorized?: string) => Buffer>
  > = {
    GET: new Map(),
    POST: new Map(),
  };

  addApi(method: string, uriRegex: RegExp, api: (queryParams?: Record<string, string>, authorized?: string) => Buffer) {
    const apis = this.apis[method];

    if (apis.has(uriRegex)) {
      throw new DuplicateApiException(method, uriRegex);
    }

    apis.set(uriRegex, api);
  }

  getApi(httpMethod: string, uri: string) {
    for (const [uriRegex, api] of this.apis[httpMethod].entries()) {
      if (uriRegex.test(uri)) {
        return api;
      }
    }
  }
}

export const router = new Router();
