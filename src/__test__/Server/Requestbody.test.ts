import RequestBody from "../../server/httpDomain/RequestBody";

describe("Request body parsing test", () => {
  const requestBody = new RequestBody();
  it("Request body parsing test. when content-type is multipart/form-data", () => {
    const mockBody = `------WebKitFormBoundary2OByyeBe2o6fe64P\r\nContent-Disposition: form-data; name="title"\r\n\r\n1\r\n------WebKitFormBoundary2OByyeBe2o6fe64P\r\nContent-Disposition: form-data; name="content"\r\n\r\n2\r\n------WebKitFormBoundary2OByyeBe2o6fe64P\r\nContent-Disposition: form-data; name="file"; filename="강아지.png"\r\nContent-Type: application/octet-stream\r\n\r\n------WebKitFormBoundary2OByyeBe2o6fe64P`;

    const parts = requestBody.parseMultipartBody("------WebKitFormBoundary2OByyeBe2o6fe64P\r\n", mockBody);
    expect(parts).toBe([
      "",
      `Content-Disposition: form-data; name="title"\r\n\r\n
      1`,
      `Content-Disposition: form-data; name="content"\r\n\r\n
      2`,
      `Content-Disposition: form-data; name="file"; filename=""\r\n
      Content-Type: application/octet-stream\r\n\r\n`,
      "",
    ]);
  });
});
