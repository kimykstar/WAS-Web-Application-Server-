const net = require("net");
const fs = require("fs");
const { getUriFromRequest } = require("./requestParser.js");
const { logger } = require("./logger.js");
const { getResourceByUri } = require("./uriProcessor.js");
const {
  createOkResponse,
  createResponseByBadRequest,
} = require("./responseCreator.js");
const { BadRequestException } = require("./CustomException.js");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    logger.http(request);
    const uri = getUriFromRequest(request);

    try {
      const [responseBody, fileExtension] = getResourceByUri(uri);
      const response = createOkResponse(responseBody, fileExtension);
      socket.write(response);
      socket.end();
    } catch (e) {
      if (e instanceof BadRequestException) {
        const response = createResponseByBadRequest(
          e.getStatusCode(),
          e.getMessage()
        );
        socket.write(response);
        socket.end();
        return;
      }

      throw e;
    }
  });
});

module.exports = { server };
