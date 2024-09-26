import net from "net";
import { getUriFromRequest } from "./requestParser";
import { logger } from "./logger";
import { getResourceByUri } from "./uriProcessor";
import { createOkResponse, createResponseByBadRequest } from "./responseCreator";
import { BadRequestException } from "./exception/BadRequestException";
import "./controller/userController";

export const server = net.createServer((socket: any) => {
  socket.on("data", (data: string) => {
    const request = data.toString();
    logger.http(request);
    const [uri, queryParams] = getUriFromRequest(request);
    try {
      const [responseBody, fileExtension] = getResourceByUri(uri, queryParams);
      const response = createOkResponse(responseBody, fileExtension);
      socket.write(response);
      socket.end();
    } catch (e: any) {
      if (e instanceof BadRequestException) {
        const response = createResponseByBadRequest(e.getStatusCode(), e.message);
        socket.write(response);
        socket.end();
        return;
      }

      throw e;
    }
  });
});
