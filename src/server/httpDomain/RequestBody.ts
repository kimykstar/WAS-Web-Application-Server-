const REGEX = /(\w+(-\w+)*)[:=](\s*([^\r\n;]+))/g;

export default class RequestBody {
  private bodyContent: Array<Record<string, string>> = [];

  parseMultipartBody(boundary: string, body: string) {
    const parts = this.splitParts(boundary, body);

    const result = this.parseParts(parts.slice(1, -1));
    this.bodyContent = result;
    console.log(result[2]);

    return this.bodyContent;
  }

  private splitParts(boundary: string, body: string) {
    return body.split(boundary).map((part) => part.trim());
  }

  private parseParts(parts: Array<string>) {
    let match;
    return parts
      .map((part) => {
        const headerEndIndex = part.indexOf("\r\n\r\n");
        return [part.slice(0, headerEndIndex), part.slice(headerEndIndex + 4)];
      })
      .reduce((reducer: Array<Record<string, string>>, [header, body]) => {
        const obj: Record<string, string> = {};
        while ((match = REGEX.exec(header)) !== null) {
          const key = match[1];
          const value = match[4].trim();
          obj[key] = value;
        }
        obj.data = body.replace("\r\n", "");
        reducer.push(obj);
        return reducer;
      }, []);
  }
}
