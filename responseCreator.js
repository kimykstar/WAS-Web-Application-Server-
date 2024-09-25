const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const { UnsupportedMimeTypeException } = require("./exception/BadRequestException.js");

const MIME = Object.freeze({
  TEXT_UTF8: "text/plain;charset=UTF-8",
  HTML: "text/html",
  CSS: "text/css",
  JS: "text/javascript",
  ICO: "image/vnd.microsoft.icon",
  PNG: "image/png",
  JPG: "image/jpeg",
});

const CRLF = "\r\n";

const createResponseStatusLine = (statusCode) => {
  return `HTTP/1.1 ${statusCode} ${getReasonPhrase(statusCode)}\r\n`;
};

const createContentType = (fileExtension) => {
  const mimeType = MIME[fileExtension.toUpperCase()];

  if (mimeType === undefined) {
    throw new UnsupportedMimeTypeException();
  }

  return `Content-Type: ${mimeType}\r\n`;
};

const createHeader = (fileExtension) => {
  const headerText = [
    createResponseStatusLine(StatusCodes.OK),
    createContentType(fileExtension),
    CRLF,
  ].join("");

  return Buffer.from(headerText);
};

const createOkResponse = (responseBody, fileExtension) => {
  const header = createHeader(fileExtension);
  return Buffer.concat([header, responseBody]);
};

const createResponseByBadRequest = (statusCode, message) => {
  return [createResponseStatusLine(statusCode), createContentType("TEXT_UTF8"), CRLF, message].join("");
};

module.exports = { createOkResponse, createResponseByBadRequest };
