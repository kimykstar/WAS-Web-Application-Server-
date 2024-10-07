import fs from "fs";
import { NotFoundUriException } from "../exception/HttpException.ts";
import { router } from "./Router.ts";
import { isExistStaticFile, isValidExtension, getStaticFileContent } from "./staticFileManager.ts";
import { createOkResponse } from "./responseCreator.ts";

export const getResponseByUri = async (
  httpMethod: string,
  uri: string,
  reqBody: Record<string, string>
): Promise<Buffer> => {
  if (uri === "/") {
    const content = fs.readFileSync("./src/static/user/index.html");
    return createOkResponse(content, "HTML");
  }

  const fileName = uri.substring(1);

  if (isValidExtension(fileName) && isExistStaticFile(fileName)) {
    const content = getStaticFileContent(fileName);
    const [name, extension] = fileName.split(".");
    return createOkResponse(content, extension.toUpperCase());
  }

  const api = router.getApi(httpMethod, uri);

  if (httpMethod === "GET" && api) {
    const queryParams = queryStringToObject(uri);
    return createOkResponse(api(queryParams), "TEXT_UTF8");
  }
  if (httpMethod === "POST" && api) {
    return await api(reqBody);
  }

  throw new NotFoundUriException();
};

const queryStringToObject = (queryString: string) => {
  return queryString
    .split("&")
    .map((entry) => entry.split("="))
    .reduce((result: Record<string, string>, [key, value]) => {
      result[key] = value;
      return result;
    }, {});
};
