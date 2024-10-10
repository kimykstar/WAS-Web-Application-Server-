import fs from "fs";
import { NotFoundUriException } from "../exception/HttpException.ts";
import { router } from "./Router.ts";
import { isExistStaticFile, isValidExtension, getStaticFileContent } from "./staticFileManager.ts";
import { createOkResponse } from "./responseCreator.ts";
import Request from "../server/Request.ts";

export const getResponseByUri = async (request: Request): Promise<Buffer> => {
  const [httpMethod, uri, version] = request.getRequestInfo();
  const reqBody = request.getBodyContent();
  if (uri === "/") {
    const content = fs.readFileSync("./src/static/index.html");
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
    return createOkResponse(api(request), "TEXT_UTF8");
  }
  if (httpMethod === "POST" && api) {
    return await api(request);
  }

  throw new NotFoundUriException();
};
