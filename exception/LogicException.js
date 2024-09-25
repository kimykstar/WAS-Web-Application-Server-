const {CustomException} = require("./CustomException");

class LogicException extends CustomException {
  #message;

  constructor(message) {
    super();
    this.#message = message;
  }

  getMessage() {
    return this.#message;
  }
}

class DuplicateApiException extends LogicException {
  constructor(method, uriRegex) {
    super(`[${method} ${uriRegex}] api가 중복되었습니다. 확인해주세요.`);
  }
}

module.exports = { DuplicateApiException }
