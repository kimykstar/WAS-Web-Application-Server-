const net = require("net");
const fs = require("fs");
const { parseURI } = require("./uriParser.js");
const { logger } = require("./logger.js");
const { processURI } = require("./uriProcessor.js");
const {
  createOkResponse,
  createNotfoundResponse,
} = require("./responseCreator.js");
const { NotFoundUriException } = require("./CustomException.js");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    logger.http(request);
    const uri = parseURI(request);

    try {
      const responseBody = processURI(uri);
      const response = createOkResponse(responseBody);
      socket.write(response);
      socket.end();
    } catch (e) {
      if (e instanceof NotFoundUriException) {
        const response = createNotfoundResponse();
        socket.write(response);
        socket.end();
        return;
      }

      throw e;
    }
  });
});

server.listen(3000, () => {
  console.log("HTTP server running on port 3000");
});
