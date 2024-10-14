import { getStaticFileContent } from "../../server/components/middlewares/staticFileManager.ts";
import fs from "fs";
import Request from "../../server/httpDomain/Request.ts";

describe("Static file manager test", () => {
  it.each([
    [new Request("GET /images/dog.jpg HTTP/1.1\r\n\r\n"), "./src/static/images/dog.jpg"],
    [new Request("GET /css/index.css HTTP/1.1\r\n\r\n"), "./src/static/css/index.css"],
    [new Request("GET / HTTP/1.1\r\n\r\n"), "./src/static/index.html"],
    [new Request("GET /images/favicon.ico HTTP/1.1\r\n\r\n"), "./src/static/images/favicon.ico"],
  ])("/getStaticFile func test", (request: Request, filePath) => {
    const fileContent = fs.readFileSync(filePath);
    expect(getStaticFileContent(request)).toEqual(fileContent);
  });
});
