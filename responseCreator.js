const { UnsupportedMimeTypeException } = require("./CustomException.js");

const RESPONSE = Object.freeze({
  OK: "200 OK",
  NotFound: "404 Not Found",
});

const MIME = Object.freeze({
  HTML: "text/html",
  CSS: "text/css",
  JS: "text/javascript",
  ICO: "image/vnd.microsoft.icon",
  PNG: "image/png",
  JPG: "image/jpeg",
});

const CRLF = "\r\n";

const createResponseStatusLine = (status) => {
  return `HTTP/1.1 ${RESPONSE[status]}\r\n`;
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
    createResponseStatusLine("OK"),
    createContentType(fileExtension),
    CRLF,
  ].join("");

  return Buffer.from(headerText);
};

const createOkResponse = (responseBody, fileExtension) => {
  const header = createHeader(fileExtension);
  return Buffer.concat([header, responseBody]);
};

const createNotfoundResponse = () => {
  return [createResponseStatusLine("NotFound"), CRLF].join("");
};

module.exports = { createOkResponse, createNotfoundResponse };
