import net from "net";
import { getRequestBodyObj, getUriFromRequest } from "./requestParser.ts";
import { logger } from "./logger.ts";
import { getResourceAndExtensionByUri } from "./uriProcessor.ts";
import { createOkResponse, createResponseByBadRequest } from "./responseCreator.ts";
import { BadRequestException } from "../exception/BadRequestException.ts";
import "../controller/userController.ts";

export const server = net.createServer((socket: any) => {
  socket.on("data", (data: string) => {
    const request = data.toString();
    logger.http(request);
    const [httpMethod, uri] = getUriFromRequest(request); // Todo: getRequestObjectFromRequest로 변경 및 동작 변경
    const bodyObj = getRequestBodyObj(request);
    try {
      const response = getResourceAndExtensionByUri(httpMethod, uri, bodyObj);
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
