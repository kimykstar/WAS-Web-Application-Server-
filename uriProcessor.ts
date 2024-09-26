import fs from "fs";
import { NotFoundUriException } from "./exception/BadRequestException";
import { router } from "./Router";

export const getResourceByUri = (uri: string): [Buffer, string] => {
  if (uri === "/") {
    return [fs.readFileSync("./static/index.html"), "HTML"];
  }

  const filename = uri.substring(1);

  if (getStaticFileNames().includes(filename)) {
    const content = fs.readFileSync(`./static/${filename}`);
    const fileExtension = filename.split(".")[1];

    return [content, fileExtension];
  }

  const api = router.findApi(uri);

  if (api) {
    return [api(), "TEXT_UTF8"];
  }

  throw new NotFoundUriException();
};

const getStaticFileNames = () => {
  return fs.readdirSync("./static");
};
