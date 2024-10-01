import { server } from "../../server/server.ts";
import request from "supertest";
import fs from "fs";

describe("Static file request Test", () => {
  it.each([
    ["/", "./src/static/index.html", { "content-type": "text/html" }],
    ["", "./src/static/index.html", { "content-type": "text/html" }],
    ["/index.html", "./src/static/index.html", { "content-type": "text/html" }],
  ])("Text static file request Test", async (requestUri, staticFilePath, expectHeader) => {
    const response = await request(server).get(requestUri).expect(200);
    expect(response.text).toBe(fs.readFileSync(staticFilePath).toString());
    expect(response.headers).toEqual(expectHeader);
  });

  it.each([
    ["/dog.jpg", "./src/static/dog.jpg", { "content-type": "image/jpeg" }],
    ["/favicon.ico", "./src/static/favicon.ico", { "content-type": "image/vnd.microsoft.icon" }],
  ])("Image static file request Test", async (requestUri, staticFilePath, expectHeader) => {
    const response = await request(server).get(requestUri).expect(200);
    expect(response.header).toEqual(expectHeader);
    expect(response.body).toEqual(fs.readFileSync(staticFilePath));
  });
});
