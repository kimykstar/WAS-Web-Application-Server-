import { getUriFromRequest } from "../../server/requestParser.ts";

describe("URI Parsing", () => {
  it("쿼리 스트링이 없는 경우", () => {
    const mockRequest = "GET / HTTP/1.1\n";

    const [url, params] = getUriFromRequest(mockRequest);
    expect(url).toBe("/");
    expect(params).toEqual({});
  });

  it("쿼리 스트링이 있는 경우", () => {
    const mockRequest = "GET /login?userId=1122";

    const [url, params] = getUriFromRequest(mockRequest);
    expect(url).toBe("/login");
    expect(params).toEqual({
      userId: "1122",
    });
  });
});
