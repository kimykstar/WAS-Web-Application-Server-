import { server } from "../../server/server.ts";
import request from "supertest";
import fs from "fs";

describe("Static file request Test", () => {
  it.each([
    ["/", "./src/static/user/index.html", { "content-type": "text/html" }],
    ["", "./src/static/user/index.html", { "content-type": "text/html" }],
    ["/user/index.html", "./src/static/user/index.html", { "content-type": "text/html" }],
    ["/css/index.css", "./src/static/css/index.css", { "content-type": "text/css" }],
    ["/javascript/header.js", "./src/static/javascript/header.js", { "content-type": "text/javascript" }],
  ])("Text static file request Test", async (requestUri, staticFilePath, expectHeader) => {
    const response = await request(server).get(requestUri).expect(200);
    expect(response.text).toBe(fs.readFileSync(staticFilePath).toString());
    expect(response.headers).toEqual(expectHeader);
  });

  it.each([
    ["/images/dog.jpg", "./src/static/images/dog.jpg", { "content-type": "image/jpeg" }],
    ["/images/favicon.ico", "./src/static/images/favicon.ico", { "content-type": "image/vnd.microsoft.icon" }],
  ])("Image static file request Test", async (requestUri, staticFilePath, expectHeader) => {
    const response = await request(server).get(requestUri).expect(200);
    expect(response.header).toEqual(expectHeader);
    expect(response.body).toEqual(fs.readFileSync(staticFilePath));
  });
});
