class Router {
  #apis = {
    GET: new Map(),
  };

  get(uriRegex, controller) {
    const getApis = this.#apis.GET;

    if (getApis.has(uriRegex)) {
      throw new Error();
    }

    getApis.set(uriRegex, controller);
  }
}
