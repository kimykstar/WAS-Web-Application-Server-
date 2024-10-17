import fs from "fs";
import Request from "../../httpDomain/Request.ts";
import { createOkResponse } from "../helper/responseCreator.ts";
import { StatusCodes } from "http-status-codes";

const STATIC_FILE_PATH: string = "./src/static";
const VALID_FILE_EXTENSION = ["css", "js", "html", "jpg", "png", "ico"];

Object.freeze(VALID_FILE_EXTENSION);

export const getStaticFileResponse = (request: Request): Buffer | null => {
  const [httpMethod, uri, version] = request.getRequestInfo();
  if (isIndexRequest(uri))
    return createOkResponse(StatusCodes.OK, readStaticFile("/index.html"), "HTML");
  if (isValidExtension(uri) && isExistStaticFile(uri))
    return createOkResponse(
      StatusCodes.OK,
      readStaticFile(uri),
      getFileNameAndExtension(uri).toUpperCase()
    );
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

export const writeFile = (fileName: string | Buffer, fileContent: string | Buffer) => {
  fs.writeFile(
    `${STATIC_FILE_PATH}/images/${fileName.slice(1, -1)}`,
    Buffer.from(fileContent),
    () => {
      console.log(`${fileName.slice(1, -1)}의 저장이 완료되었습니다.`);
      return true;
    }
  );
  return false;
};
