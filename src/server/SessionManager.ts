export default class SessionManager {
  static SECOND = 1000;
  static MINUTE = 60 * this.SECOND;
  static SESSION_EXPIRATION_TIME = this.MINUTE;

  private sessions: Record<string, string>;
  private expirationTime: number;
  // ToDo: singleton
  constructor(expirationTime: number) {
    this.sessions = {}; // SessionId: email형태로 저장
    this.expirationTime = expirationTime;
  }

  createSession(sessionId: string, email: string) {
    if (!this.isExistSession(sessionId)) {
      this.sessions[sessionId] = email;
    }
    this.startSessionExpiration(sessionId);
  }

  startSessionExpiration(sessionId: string) {
    setTimeout(() => {
      const { [sessionId]: value, ...removedSessions } = this.sessions;
      this.sessions = removedSessions;
    }, this.expirationTime);
  }

  getSessionInfo(sessionId: string) {
    if (this.isExistSession(sessionId)) {
      return this.sessions[sessionId];
    }
  }

  isExistSession(sessionId: string) {
    return Object.keys(this.sessions).includes(sessionId);
  }
}
