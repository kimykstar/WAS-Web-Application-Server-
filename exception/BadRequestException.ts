const {StatusCodes} = require("http-status-codes");
const {CustomException} = require("./CustomException");

abstract class BadRequestException extends CustomException {
  private readonly statusCode: number;
  private readonly message: string;

  protected constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getMessage(): string {
    return this.message;
  }
}

class NotFoundUriException extends BadRequestException {
  constructor() {
    super(StatusCodes.NOT_FOUND, "해당하는 uri에 대한 리소스를 찾을 수 없습니다.");
  }
}

class UnsupportedMimeTypeException extends BadRequestException {
  constructor() {
    super(StatusCodes.UNSUPPORTED_MEDIA_TYPE, "지원되지 않는 MIME 타입입니다.");
  }
}

module.exports = {
  BadRequestException,
  NotFoundUriException,
  UnsupportedMimeTypeException,
};
