import {CustomException} from "./CustomException";

abstract class LogicException extends CustomException {

  protected constructor(message: string) {
    super(message);
  }
}

export class DuplicateApiException extends LogicException {
  constructor(method: string, uriRegex: RegExp) {
    super(`[${method} ${uriRegex}] api가 중복되었습니다. 확인해주세요.`);
  }
}
