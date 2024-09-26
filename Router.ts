import {DuplicateApiException} from "./exception/LogicException";

export type Method = "GET" | "POST";

class Router {
  private readonly apis: Record<Method, Map<RegExp, Function>> = {
    GET: new Map(),
    POST: new Map(),
  };

  addController(method: Method, uriRegex: RegExp, controller: Function) {
    const api = this.apis[method];

    if (api.has(uriRegex)) {
      throw new DuplicateApiException(method, uriRegex);
    }

    api.set(uriRegex, controller);
  }
}

export const router = new Router();
