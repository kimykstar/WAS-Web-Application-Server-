export default class Cookie {
  private id: string = "";
  private attribute: Record<string, string> = {};

  constructor() {}

  setSessionId(sessionId: string) {
    this.id = sessionId;
    return this;
  }

  setSessionAttr(key: string, value: string = "") {
    this.attribute[key] = value;
    return this;
  }

  getSessionHeader() {
    return (
      `session_id=${this.id}; ` +
      Object.entries(this.attribute)
        .map((obj) => (obj[1] === "" ? obj[0] : obj.join("=")))
        .join("; ")
    );
  }

  getSessionId() {
    return this.id;
  }
}
