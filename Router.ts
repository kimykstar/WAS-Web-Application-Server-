const {DuplicateApiException} = require("./exception/LogicException");

class Router {
  private readonly apis: Record<string, Map<string, RegExp>> = {
    GET: new Map(),
  };

  get(uriRegex, controller) {
    const getApis = this.apis.GET;

    if (getApis.has(uriRegex)) {
      throw new DuplicateApiException("GET", uriRegex);
    }

    getApis.set(uriRegex, controller);
  }
}

const router = new Router();

module.exports = { router }
