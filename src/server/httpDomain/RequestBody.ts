const REGEX = /(\w+(-\w+)*)[:=](\s*([^\r\n;]+))/g;

export default class RequestBody {
  private bodyContent: Array<Record<string, string>> = [];

  parseMultipartBody(boundary: string, body: string) {
    const contents = body.split(boundary).slice(1, -1);
    // 각 부분들을 parsing하는 메소드 구현
    const parts = this.splitParts(boundary, body);
    // parsing된 각 부분들을 순회하면서 각 part를 parsing하고 bodyContent에 append한다.
    // part를 parsing하려면 header와 body를 CRLF두번을 indexOf를 활용해서 분리한다.
    // body의 경우에는 data를 키로하고, header는 정규표현식으로 추출해서 추출한다.

    const result = this.parseParts(parts.slice(1, -1));
    this.bodyContent = result;
    console.log(result[2].data);

    return this.bodyContent;
  }

  private splitParts(boundary: string, body: string) {
    return body.split(boundary).map((part) => part.trim());
  }

  private parseParts(parts: Array<string>) {
    let match;
    return parts
      .map((part) => part.split("\r\n\r\n"))
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
