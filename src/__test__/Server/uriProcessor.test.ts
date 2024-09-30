import { getResourceAndExtensionByUri } from "../../server/uriProcessor.ts";
import fs from "fs";

describe("URI processor test", () => {
  it("Request HTML static file test", () => {
    const uri = "/index.html";
    const [fileContent, extension] = getResourceAndExtensionByUri(uri);
    expect(fileContent).toEqual(fs.readFileSync("./src/static/index.html"));
    expect(extension).toBe("html");
  });

  it("Request CSS static file Test", () => {
    const uri = "/index.css";
    const [fileContent, extension] = getResourceAndExtensionByUri(uri);
    expect(fileContent).toEqual(fs.readFileSync("./src/static/index.css"));
    expect(extension).toBe("css");
  });

  it("Request ICO static file Test", () => {
    const uri = "/favicon.ico";
    const [fileContent, extension] = getResourceAndExtensionByUri(uri);
    expect(fileContent).toEqual(fs.readFileSync("./src/static/favicon.ico"));
    expect(extension).toBe("ico");
  });

  it("Request JPG static file Test", () => {
    const uri = "/dog.jpg";
    const [fileContent, extension] = getResourceAndExtensionByUri(uri);
    expect(fileContent).toEqual(fs.readFileSync("./src/static/dog.jpg"));
    expect(extension).toBe("jpg");
  });
});
