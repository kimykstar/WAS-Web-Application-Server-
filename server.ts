const net = require("net");
const { getUriFromRequest } = require("./requestParser.ts");
const { logger } = require("./logger.js");
const { getResourceByUri } = require("./uriProcessor");
const {
  createOkResponse,
  createResponseByBadRequest,
} = require("./responseCreator.ts");
const { BadRequestException } = require("./exception/BadRequestException.ts");

const server = net.createServer((socket: any) => {
  socket.on("data", (data: string) => {
    const request = data.toString();
    logger.http(request);
    const uri = getUriFromRequest(request);

    try {
      const [responseBody, fileExtension] = getResourceByUri(uri);
      const response = createOkResponse(responseBody, fileExtension);
      socket.write(response);
      socket.end();
    } catch (e: any) {
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
