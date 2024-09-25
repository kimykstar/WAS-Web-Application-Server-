const fs = require("fs");
const { NotFoundUriException } = require("./exception/BadRequestException.ts");

const getResourceByUri = (uri: string) => {
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

module.exports = { getResourceByUri };
