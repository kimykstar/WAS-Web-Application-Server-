import net from "net";
import { logger } from "./components/helper/logger.ts";
import { getResponseByUri } from "./components/uriProcessor.ts";
import { createResponseByBadRequest } from "./components/helper/responseCreator.ts";
import { HttpException } from "../exception/HttpException.ts";
import Request from "./httpDomain/Request.ts";
import "../controller/userController.ts";

export const server = net.createServer((socket: any) => {
  socket.on("data", async (data: string) => {
    const requestText = data.toString();
    logger.http(requestText);
    const request = new Request(requestText);
    try {
      const response = await getResponseByUri(request);
      socket.write(response);
      socket.end();
    } catch (e: any) {
      if (e instanceof HttpException) {
        const response = createResponseByBadRequest(e.getStatusCode(), e.message);
        socket.write(response);
        socket.end();
        return;
      }

      throw e;
    }
  });
});
