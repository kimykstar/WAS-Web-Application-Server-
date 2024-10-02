import fs from "fs";
import { NotFoundUriException } from "../exception/BadRequestException.ts";
import { router } from "./Router.ts";
import { isExistStaticFile, isValidExtension, getStaticFileContent } from "./staticFileManager.ts";

export const getResourceAndExtensionByUri = (httpMethod: string, uri: string, reqBody: Record<string, string>): [Buffer, string] => {
  if (uri === "/") {
    return [fs.readFileSync("./src/static/views/index.html"), "HTML"];
  }

  const fileName = uri.substring(1);

  if (isValidExtension(fileName) && isExistStaticFile(fileName)) {
    const content = getStaticFileContent(fileName);
    const [name, extension] = fileName.split(".");

    return [content, extension];
  }

  const api = router.getApi(httpMethod, uri);

  if (httpMethod === 'GET' && api) {
    const queryParams = queryStringToObject(uri);
    return [api(queryParams), "TEXT_UTF8"];
  }else if(httpMethod === 'POST' && api) {
    return [api(reqBody), 'TEXT_UTF8'];
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
