import { CustomException } from "./CustomException.ts";

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

export class InvalidRegexException extends LogicException {
  constructor(uri: string) {
    super(`${uri}: 유효한 형식의 uri가 아닙니다. 확인해주세요.`);
  }
}

export class DatabaseConnectException extends LogicException {
  constructor(tableName: string) {
    super(`${tableName}: 해당 테이블이 존재하지 않습니다. 확인해주세요.`);
  }
}
