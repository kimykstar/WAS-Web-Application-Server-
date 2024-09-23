const fs = require("fs");
const { NotFoundUriException } = require("./CustomException.js");

const processURI = (uri) => {
  if (uri === "/") {
    return fs.readFileSync("./static/index.html", "utf-8");
  }

  const filename = uri.substring(1);

  if (getStaticFileNames().includes(filename)) {
    return fs.readFileSync(`./static/${filename}`, "utf-8");
  }

  throw new NotFoundUriException();
};

const getStaticFileNames = () => {
  return fs.readdirSync("./static");
};

module.exports = { processURI };
