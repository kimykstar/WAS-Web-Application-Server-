import { getUriFromRequest } from "../../server/requestParser.ts";

describe("URI Parsing", () => {
  it("No querystring test", () => {
    const mockRequest = "GET / HTTP/1.1\n";

    const [httpMethod, url] = getUriFromRequest(mockRequest);
    expect(httpMethod).toBe("GET");
    expect(url).toBe("/");
  });

  it("Existing querystring test", () => {
    const mockRequest = "GET /login?userId=1122";

    const [httpMethod, url] = getUriFromRequest(mockRequest);
    expect(httpMethod).toBe("GET");
    expect(url).toBe("/login");
  });
});
