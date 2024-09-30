export const getUriFromRequest = (request: string): [string, Record<string, string>?] => {
  const lines = request.split("\n");
  const requestLine = lines[0];
  const [httpMethod, uri, httpVersion] = requestLine.split(" ");

  if (!uri.includes("?")) {
    return [uri, {}];
  }

  const [url, queryString] = uri.split("?");
  return [url, queryStringToObject(queryString)];
};

const queryStringToObject = (queryString: string) => {
  return queryString
    .split("&")
    .map((entry) => entry.split("="))
    .reduce((result: Record<string, string>, [key, value]) => {
      result[key] = value;
      return result;
    }, {});
};
