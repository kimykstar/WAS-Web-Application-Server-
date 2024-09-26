import fs from "fs";
import {NotFoundUriException} from "./exception/BadRequestException";

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

  throw new NotFoundUriException();
};

const getStaticFileNames = () => {
  return fs.readdirSync("./static");
};
