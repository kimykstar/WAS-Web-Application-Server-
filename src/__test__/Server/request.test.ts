import { server } from "../../server/server.ts";
import request from "supertest";
import fs from "fs";

describe("Static file request Test", () => {
  it("Index file request Test", async () => {
    const response = await request(server).get("/").expect(200);
    expect(response.text).toBe(fs.readFileSync("./src/static/index.html").toString());
    expect(response.headers).toEqual({
      "content-type": "text/html",
    });
  });

  it("None path request Test", async () => {
    const response = await request(server).get("").expect(200);
    expect(response.text).toBe(fs.readFileSync("./src/static/index.html").toString());
    expect(response.headers).toEqual({
      "content-type": "text/html",
    });
  });

  it("Static file path request Test", async () => {
    const response = await request(server).get("/index.html").expect(200);
    expect(response.text).toBe(fs.readFileSync("./src/static/index.html").toString());
    expect(response.headers).toEqual({
      "content-type": "text/html",
    });
  });

  it("CSS file path request Test", async () => {
    const response = await request(server).get("/index.css").expect(200);
    expect(response.text).toBe(fs.readFileSync("./src/static/index.css").toString());
    expect(response.headers).toEqual({
      "content-type": "text/css",
    });
  });

  it("jpg file path request Test", async () => {
    const response = await request(server).get("/dog.jpg").expect(200);
    expect(response.header).toEqual({
      "content-type": "image/jpeg",
    });
    expect(response.body).toEqual(fs.readFileSync("./src/static/dog.jpg"));
  });

  it("ico file path request Test", async () => {
    const response = await request(server).get("/favicon.ico").expect(200);
    expect(response.header).toEqual({
      "content-type": "image/vnd.microsoft.icon",
    });
    expect(response.body).toEqual(fs.readFileSync("./src/static/favicon.ico"));
  });
});
