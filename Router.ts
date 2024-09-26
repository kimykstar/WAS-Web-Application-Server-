import { DuplicateApiException } from "./exception/LogicException";

export type Method = "GET" | "POST";

class Router {
  private readonly apis: Record<Method, Map<RegExp, (queryParams?: Record<string, string>) => Buffer>> = {
    GET: new Map(),
    POST: new Map(),
  };

  addApi(method: Method, uriRegex: RegExp, api: (queryParams?: Record<string, string>) => Buffer) {
    const apis = this.apis[method];

    if (apis.has(uriRegex)) {
      throw new DuplicateApiException(method, uriRegex);
    }

    apis.set(uriRegex, api);
  }

  getApi(uri: string) {
    for (const [uriRegex, api] of this.apis.GET.entries()) {
      if (uriRegex.test(uri)) {
        return api;
      }
    }
  }
}

export const router = new Router();
