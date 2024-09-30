import { getUriFromRequest } from "../../server/requestParser.ts";

describe("URI Parsing", () => {
  it("No querystring test", () => {
    const mockRequest = "GET / HTTP/1.1\n";

    const [url, params] = getUriFromRequest(mockRequest);
    expect(url).toBe("/");
    expect(params).toEqual({});
  });

  it("Existing querystring test", () => {
    const mockRequest = "GET /login?userId=1122";

    const [url, params] = getUriFromRequest(mockRequest);
    expect(url).toBe("/login");
    expect(params).toEqual({
      userId: "1122",
    });
  });
});
