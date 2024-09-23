const Response = {
  OK: "200 OK",
  NotFound: "404 Not Found",
};

const CONTENT_TYPE = "Content-Type: text/html\r\n";
const CRLF = "\r\n";

const createResponseStatusLine = (status) => {
  return `HTTP/1.1 ${Response[status]}\r\n`;
};

const createOkResponse = (responseBody) => {
  return [
    createResponseStatusLine("OK"),
    CONTENT_TYPE,
    CRLF,
    responseBody,
  ].join("");
};

const createNotfoundResponse = () => {
  return [createResponseStatusLine("NotFound"), CRLF].join("");
};

module.exports = { createOkResponse, createNotfoundResponse };
