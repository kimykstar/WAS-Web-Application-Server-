const SECOND = 1000;
const MINUTE = 60 * SECOND;

class SessionManager {
  private sessions: Record<string, string>;
  private expirationTime: number = MINUTE;
  constructor() {
    this.sessions = {};
  }

  setExpirationTime(expirationTime: number) {
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

  deleteSession(sessionId: string) {
    if (this.isExistSession(sessionId)) {
      delete this.sessions[sessionId];
    }
  }
}

const sessionManager = new SessionManager();

export { sessionManager, SECOND, MINUTE };
