import fs from "fs";
import { NotFoundUriException } from "../exception/BadRequestException.ts";
import { router } from "./Router.ts";
import { isExistStaticFile, isValidExtension, getStaticFileContent } from "./staticFileManager.ts";

export const getResourceAndExtensionByUri = (uri: string, queryParams?: Record<string, string>): [Buffer, string] => {
  if (uri === "/") {
    return [fs.readFileSync("./src/static/views/index.html"), "HTML"];
  }

  const fileName = uri.substring(1);
  
  if (isValidExtension(fileName) && isExistStaticFile(fileName)) {
    const content = getStaticFileContent(fileName);
    const [name, extension] = fileName.split(".");

    return [content, extension];
  }

  const api = router.getApi(uri);

  if (api) {
    // uri에 대한 parameter들을 추출하고 api()메서드에 전달
    return [api(queryParams), "TEXT_UTF8"];
  }

  throw new NotFoundUriException();
};
