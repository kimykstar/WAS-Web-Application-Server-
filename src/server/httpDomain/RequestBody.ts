import { splitBuffer } from "../utils/bufferUtils.ts";

const REGEX = /(\w+(-\w+)*)[:=](\s*([^\r\n;]+))/g;

export default class RequestBody {
  private bodyContent: Array<Record<string, string | Buffer>> = [];

  parseMultipartBody(boundary: string, body: Buffer) {
    const parts = this.splitParts(boundary, body);

    const result = this.parseParts(parts.slice(1, -1));
    this.bodyContent = result;
    console.log(result[2]);

    return this.bodyContent;
  }

  private splitParts(boundary: string, body: Buffer) {
    return splitBuffer(body, boundary);
  }

  private parseParts(parts: Buffer[]) {
    let match;
    return parts
      .map((part) => {
        const headerEndIndex = part.indexOf("\r\n\r\n");
        return [part.slice(0, headerEndIndex), part.slice(headerEndIndex + 4)];
      })
      .reduce((reducer: Array<Record<string, string | Buffer>>, [header, body]) => {
        const obj: Record<string, string | Buffer> = {};
        while ((match = REGEX.exec(header.toString())) !== null) {
          const key = match[1];
          const value = match[4].trim();
          obj[key] = value;
        }
        obj.data = body;
        reducer.push(obj);
        return reducer;
      }, []);
  }
}
