import fs from "fs";
import Request from "../server/Request.ts";
import { createOkResponse } from "../server/responseCreator.ts";

const STATIC_FILE_PATH: string = "./src/static";

const VALID_FILE_EXTENSION: Array<string> = ["css", "js", "html", "jpg", "png", "ico"];

Object.freeze(STATIC_FILE_PATH);
Object.freeze(VALID_FILE_EXTENSION);

export const getStaticFileContent = (request: Request): Buffer | null => {
  const [httpMethod, uri, version] = request.getRequestInfo();
  if (isIndexRequest(uri)) return readStaticFile("/index.html");
  if (isValidExtension(uri) && isExistStaticFile(uri))
    // 확장자에 따른 선택 해주어야함..
    return createOkResponse(readStaticFile(uri), getFileNameAndExtension(uri).toUpperCase());
  return null;
};

const isExistStaticFile = (uri: string): Boolean => {
  const filePath = uri.substring(1);
  return fs.existsSync(`${STATIC_FILE_PATH}/${filePath}`) ? true : false;
};

const isValidExtension = (uri: string): Boolean => {
  const filePath = uri.substring(1);
  const paths = filePath.split("/");
  const [name, extension] = paths[paths.length - 1].split(".");
  return VALID_FILE_EXTENSION.includes(extension);
};

const isIndexRequest = (uri: string) => {
  return uri === "/" ? true : false;
};

const readStaticFile = (uri: string): Buffer => {
  const filePath = uri.substring(1);
  const fileAbsolutePath = `${STATIC_FILE_PATH}/${filePath}`;
  return fs.readFileSync(fileAbsolutePath);
};

const getFileNameAndExtension = (uri: string) => {
  const [, extension] = uri.split(".");
  return extension;
};
