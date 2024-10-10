import SetCookie from "../../server/SetCookie.ts";
import { v4 as createUUID } from "uuid";

describe("Response's set-cookie header make test", () => {
  test("Header value make test", () => {
    const mockSetCookie = new SetCookie();
    const uuid = createUUID();
    mockSetCookie
      .setCookieData("SID", uuid)
      .setCookieAttr("path", "/")
      .setCookieAttr("HttpOnly")
      .setCookieAttr("Max-Age", "3600");

    const setCookieValue = mockSetCookie.getSetCookieHeaderValue();
    expect(setCookieValue).toBe(`SID=${uuid}; path=/; HttpOnly; Max-Age=3600`);
  });
});
