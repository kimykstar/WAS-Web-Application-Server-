import { getResourceAndExtensionByUri } from "../../server/uriProcessor.ts";
import fs from "fs";

describe("URI processor test", () => {
  it.each([
    ["/index.html", "./src/static/index.html", "html"],
    ["/favicon.ico", "./src/static/favicon.ico", "ico"],
    ["/dog.jpg", "./src/static/dog.jpg", "jpg"],
  ])("Static file data & file extention read test", (uri: string, staticFilePath: string, expExtention: string) => {
    const [fileContent, extension] = getResourceAndExtensionByUri(uri);
    expect(fileContent).toEqual(fs.readFileSync(staticFilePath));
    expect(extension).toBe(expExtention);
  });
});
