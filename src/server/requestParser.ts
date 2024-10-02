export const getUriFromRequest = (request: string): [string, string] => {
  const lines = request.split("\n");
  const requestLine = lines[0];
  const [httpMethod, uri, httpVersion] = requestLine.split(" ");

  if (!uri.includes("?")) {
    return [httpMethod, uri];
  }

  const [url, queryString] = uri.split("?");
  return [httpMethod, url];
};

export const getRequestBodyObj = (request: string): Record<string, string> => {
  const [header, body] = request.split('\r\n\r\n');
  const bodyObj = parseBodyToObj(body);

  return bodyObj;
}

const parseBodyToObj = (datas: string): Record<string, string> => {
  return datas.split('&')
    .map(data => data.split('='))
    .reduce((result: Record<string, string>, [key, value]) => {
      result[key] = value;
      return result;
    }, {});
}