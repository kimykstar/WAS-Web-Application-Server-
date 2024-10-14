import { DuplicateApiException } from "../exception/LogicException.ts";
import Request from "../server/Request.ts";

class Router {
  private readonly apis: Record<string, Map<RegExp, (request: Request) => Buffer>> = {
    GET: new Map(),
    POST: new Map(),
  };

  addApi(method: string, uriRegex: RegExp, api: (request: Request) => Buffer) {
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

  processApi(request: Request) {
    const [httpMethod, uri, version] = request.getRequestInfo();
    const apiController = this.getApi(httpMethod, uri);
    return apiController ? apiController(request) : null;
  }
}

export const router = new Router();
