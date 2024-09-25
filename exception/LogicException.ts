const {CustomException} = require("./CustomException");

abstract class LogicException extends CustomException {
  private readonly message: string;

  protected constructor(message: string) {
    super();
    this.message = message;
  }

  getMessage(): string {
    return this.message;
  }
}

class DuplicateApiException extends LogicException {
  constructor(method: string, uriRegex: RegExp) {
    super(`[${method} ${uriRegex}] api가 중복되었습니다. 확인해주세요.`);
  }
}

module.exports = { DuplicateApiException }
