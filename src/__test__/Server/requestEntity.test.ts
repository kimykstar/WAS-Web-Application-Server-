import Request from "../../server/httpDomain/Request.ts";

describe("Request object parsing test", () => {
  it.each([
    ["GET /create HTTP/1.1\r\n\r\n", ["GET", "/create", "HTTP/1.1"]],
    ["POST /update HTTP/1.1\r\n\r\n", ["POST", "/update", "HTTP/1.1"]],
  ])("Request object's header parsing test", (mockRequest, expectHeader) => {
    const request = new Request(mockRequest);
    expect(request.getRequestInfo()).toEqual(expectHeader);
  });

  it.each([["GET /create?user_id=1&name=영관 HTTP/1.1\r\n\r\n", { user_id: "1", name: "영관" }]])(
    "When existing queryParameter, request parsing test",
    (mockRequest, expectQueryParams) => {
      const request = new Request(mockRequest);
      expect(request.getQueryParams()).toEqual(expectQueryParams);
    }
  );

  it.each([["POST /create HTTP/1.1\r\n\r\nuser_id=1&name=영관", { user_id: "1", name: "영관" }]])(
    "When existing body data, request parsing test",
    (mockRequest, expectBody) => {
      const request = new Request(mockRequest);
      expect(request.getBodyContent()).toEqual(expectBody);
    }
  );
});
