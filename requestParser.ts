export const getUriFromRequest = (request: string) => {
  const lines = request.split("\n");
  const requestLine = lines[0];
  return requestLine.split(" ")[1];
};
