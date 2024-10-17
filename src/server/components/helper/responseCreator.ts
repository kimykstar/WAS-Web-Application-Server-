import { StatusCodes } from "http-status-codes";
import { v4 as createUUID } from "uuid";
import Response from "../../httpDomain/Response.ts";
import { sessionManager } from "./SessionManager.ts";
import SetCookie from "../../httpDomain/SetCookie.ts";

const MIME: Record<string, string> = {
  TEXT_UTF8: "text/plain;charset=utf-8",
  HTML: "text/html",
  CSS: "text/css",
  JS: "text/javascript",
  ICO: "image/vnd.microsoft.icon",
  PNG: "image/png",
  JPG: "image/jpeg",
};

Object.freeze(MIME);

export const createOkResponse = (
  statusCode: number,
  responseBody: Buffer | string,
  fileExtension: string
): Buffer => {
  const response = new Response();
  response
    .setStatusCode(statusCode)
    .addHeader("content-type", MIME[fileExtension])
    .setBody(responseBody);
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

export const createClientErrorResponse = (statusCode: number, bodyContent = "") => {
  const response = new Response();
  response.setStatusCode(statusCode);
  return !bodyContent
    ? response.addHeader("content-type", MIME["TEXT_UTF8"]).setBody(bodyContent).getResponse()
    : response.getResponse();
};

export const createServerErrorResponse = (statusCode: number, bodyContent: string = "") => {
  const response = new Response();
  response.setStatusCode(statusCode);
  return !bodyContent
    ? response.addHeader("content-type", MIME["TEXT_UTF8"]).setBody(bodyContent).getResponse()
    : response.getResponse();
};
