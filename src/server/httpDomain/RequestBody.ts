const REGEX = /(\w+(-\w+)*)[:=](\s*([^\r\n;]+))/g;

export default class RequestBody {
  private bodyContent: Array<Record<string, string | Buffer>> = [];

  parseMultipartBody(boundary: string, body: string) {
    const contents = body.split(boundary).slice(1, -1);
    const parts = this.splitHeaderBody(contents);
    this.getBodyToObjects(parts);

    return this.bodyContent;
  }

  // 순회하면서 각 content의 header와 body를 split해야함
  private splitHeaderBody(contents: Array<string>) {
    return contents.map((content) => content.split("\r\n\r\n"));
  }

  private getBodyToObjects(parts: Array<Array<string>>) {
    let match;
    parts.reduce((reducer, [header, body], idx) => {
      const obj: Record<string, string> = {};
      while ((match = REGEX.exec(header)) !== null) {
        const key = match[1];
        const value = match[4].trim();
        obj[key] = value;
      }
      obj.data = body.replace("\r\n", "");
      reducer.push(obj);
      return reducer;
    }, this.bodyContent);
  }
}
