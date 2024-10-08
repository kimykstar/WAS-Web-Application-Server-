import SessionManager from "../../server/SessionManager";
import { v4 as createUUID } from "uuid";

describe("SessionManager session test", () => {
  // ToDo: Singleton 호출
  const sessionManager = new SessionManager(SessionManager.SECOND);
  let mockUUID: string;
  let email: string;
  beforeAll(() => {
    mockUUID = createUUID();
    email = "wow@naver.com";
  });

  test("Session expiration test", (done) => {
    sessionManager.createSession(mockUUID, email);

    expect(sessionManager.isExistSession(mockUUID)).toBe(true);
    expect(sessionManager.getSessionInfo(mockUUID)).toBe(email);

    setTimeout(() => {
      expect(sessionManager.isExistSession(mockUUID)).toBe(false);
      expect(sessionManager.getSessionInfo(mockUUID)).toBeUndefined();
      done();
    }, 2 * SessionManager.SECOND);
  });
});
