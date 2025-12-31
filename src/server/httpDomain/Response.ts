import { getReasonPhrase, StatusCodes } from "http-status-codes";
export default class Response {
  private statusCode: number;
  private header: Record<string, string>;
  private body: Buffer;

  constructor() {
    this.statusCode = 0;
    this.header = {};
    this.body = Buffer.from("");
  }

  setStatusCode(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  addHeader(key: string, value: string) {
    this.header[key] = value;
    return this;
  }

  setBody(content: Buffer | string) {
    if (typeof content === "string") {
      content = Buffer.from(content);
    }
    this.body = content;
    return this;
  }

  createHeader() {
    return (
      [
        `HTTP/1.1 ${this.statusCode} ${getReasonPhrase(this.statusCode)}\r\n`,
        Object.entries(this.header).reduce((header, [key, value]) => {
          header += `${key}: ${value}\r\n`;
          return header;
        }, ""),
      ].join("") + "\r\n"
    );
  }

  getResponse() {
    const header = Buffer.from(this.createHeader());
    return Buffer.concat([header, this.body]);
  }
}
