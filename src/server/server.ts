import net from "net";
import { getRequestBodyObj, getUriFromRequest } from "./requestParser.ts";
import { logger } from "./logger.ts";
import { getResponseByUri } from "./uriProcessor.ts";
import { createResponseByBadRequest } from "./responseCreator.ts";
import { BadRequestException } from "../exception/BadRequestException.ts";
import "../controller/userController.ts";

export const server = net.createServer((socket: any) => {
  socket.on("data", async (data: string) => {
    const request = data.toString();
    logger.http(request);
    const [httpMethod, uri] = getUriFromRequest(request);
    const bodyObj = getRequestBodyObj(request);
    try {
      const response = await getResponseByUri(httpMethod, uri, bodyObj);
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
