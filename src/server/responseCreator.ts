import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { UnsupportedMimeTypeException } from "../exception/HttpException.ts";
import Response from "../server/Response.ts";
import SetCookie from "./SetCookie.ts";
import { v4 as createUUID } from "uuid";
import { sessionManager } from "./SessionManager.ts";

const MIME: Record<string, string> = Object.freeze({
  TEXT_UTF8: "text/plain;",
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

const createHeaderAttr = (key: string, value: string) => {
  return `${key}: ${value}\r\n`;
};

const createHeader = (fileExtension: string): Buffer => {
  const headerText = [
    createResponseStatusLine(StatusCodes.OK),
    createContentType(fileExtension),
    CRLF,
  ].join("");

  return Buffer.from(headerText);
};

export const createOkResponse = (responseBody: Buffer | string, fileExtension: string): Buffer => {
  const response = new Response();
  response
    .setStatusCode(StatusCodes.OK)
    .addHeader("content-type", MIME[fileExtension])
    .setBody(responseBody);
  return response.getResponse();
};

export const createResponseByBadRequest = (statusCode: number, message: string) => {
  const response = new Response();
  response.setStatusCode(statusCode).addHeader("content-type", MIME["TEXT_UTF8"]).setBody(message);
  return response.getResponse();
};

export const createRedirectionResponse = (redirectPath: string) => {
  const response = new Response();
  response.setStatusCode(StatusCodes.MOVED_TEMPORARILY).addHeader("location", redirectPath);
  return response.getResponse();
};

export const createLoginRedirectionResponse = (redirectPath: string, email: string) => {
  const response = new Response();
  response
    .setStatusCode(StatusCodes.MOVED_TEMPORARILY)
    .addHeader("Set-Cookie", createLoginSessionCookie(email))
    .addHeader("location", redirectPath);
  return response.getResponse();
};

const createLoginSessionCookie = (userEmail: string) => {
  const setCookie = new SetCookie();
  const uuid = createUUID();
  sessionManager.createSession(uuid, userEmail);
  setCookie
    .setCookieData("SID", uuid)
    .setCookieAttr("path", "/")
    .setCookieAttr("HttpOnly")
    .setCookieAttr("Max-Age", "3600");
  return setCookie.getSetCookieHeaderValue();
};

export const createUserTokenResponse = (redirectPath: string, userEmail: string) => {
  const response = new Response();
  const tokenId = createUUID();
  sessionManager.createSession(tokenId, userEmail);
  response.setStatusCode(StatusCodes.OK).setBody(tokenId);
  return response.getResponse();
};
