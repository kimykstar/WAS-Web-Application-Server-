import { StatusCodes } from "http-status-codes";
import { CustomException } from "./CustomException.ts";

export abstract class HttpException extends CustomException {
  private readonly statusCode: number;

  protected constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}

export class NotFoundUriException extends HttpException {
  constructor() {
    super(StatusCodes.NOT_FOUND, "해당하는 uri에 대한 리소스를 찾을 수 없습니다.");
  }
}

export class UnsupportedMimeTypeException extends HttpException {
  constructor() {
    super(StatusCodes.UNSUPPORTED_MEDIA_TYPE, "지원되지 않는 MIME 타입입니다.");
  }
}
