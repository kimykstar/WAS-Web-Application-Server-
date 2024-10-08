import Cookie from "../../server/Cookie.ts";
import { v4 as createUUID } from "uuid";

describe("Create session test", () => {
  test("Create session test", () => {
    const session = new Cookie();
    const uuid = createUUID();
    session.setSessionId(uuid).setSessionAttr("path", "/").setSessionAttr("HttpOnly").setSessionAttr("Max-Age", "3600");

    expect(session.getSessionHeader()).toBe(`session_id=${uuid}; path=/; HttpOnly; Max-Age=3600\r\n`);
  });
});
