import { getResourceAndExtensionByUri } from "../../server/uriProcessor.ts";
import fs from "fs";

describe("URI processor test", () => {
  it.each([
    ["GET", "/views/index.html", "./src/static/views/index.html", "html"],
    ["GET", "/images/favicon.ico", "./src/static/images/favicon.ico", "ico"],
    ["GET", "/images/dog.jpg", "./src/static/images/dog.jpg", "jpg"],
  ])("Static file data & file extention read test", (httpMethod: string, uri: string, staticFilePath: string, expExtention: string) => {
    const [fileContent, extension] = getResourceAndExtensionByUri(httpMethod, uri, {});
    expect(fileContent).toEqual(fs.readFileSync(staticFilePath));
    expect(extension).toBe(expExtention);
  });
});
