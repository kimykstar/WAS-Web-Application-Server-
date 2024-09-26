import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { UnsupportedMimeTypeException } from "./exception/BadRequestException.ts";

const MIME: Record<string, string> = Object.freeze({
  TEXT_UTF8: "text/plain;charset=UTF-8",
  HTML: "text/html",
  CSS: "text/css",
  JS: "text/javascript",
  ICO: "image/vnd.microsoft.icon",
  PNG: "image/png",
  JPG: "image/jpeg",
});

const CRLF = "\r\n";

const createResponseStatusLine = (statusCode: number) => {
  return `HTTP/1.1 ${statusCode} ${getReasonPhrase(statusCode)}\r\n`;
};

const createContentType = (fileExtension: string) => {
  const mimeType = MIME[fileExtension.toUpperCase()];

  if (mimeType === undefined) {
    throw new UnsupportedMimeTypeException();
  }

  return `Content-Type: ${mimeType}\r\n`;
};

const createHeader = (fileExtension: string): Buffer => {
  const headerText = [createResponseStatusLine(StatusCodes.OK), createContentType(fileExtension), CRLF].join("");

  return Buffer.from(headerText);
};

export const createOkResponse = (responseBody: Buffer, fileExtension: string): Buffer => {
  const header = createHeader(fileExtension);
  return Buffer.concat([header, responseBody]);
};

export const createResponseByBadRequest = (statusCode: number, message: string) => {
  return [createResponseStatusLine(statusCode), createContentType("TEXT_UTF8"), CRLF, message].join("");
};
