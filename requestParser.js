const getUriFromRequest = (request) => {
  const lines = request.split("\n");
  const requestLine = lines[0];
  return requestLine.split(" ")[1];
};

module.exports = { getUriFromRequest };
