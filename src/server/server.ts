import net from "net";
import { logger } from "./components/helper/logger.ts";
import { getResponseByUri } from "./components/uriProcessor.ts";
import { createClientErrorResponse } from "./components/helper/responseCreator.ts";
import { HttpException } from "../exception/HttpException.ts";
import Request from "./httpDomain/Request.ts";
import "../controller/userController.ts";
import "../controller/postingController.ts";

export const server = net.createServer((socket: any) => {
  let reqeustBuffer = Buffer.alloc(0);
  let contentLength: number | null = null;
  let headerParsed = false;

  // chunk를 모아서 end에서 처리하도록
  socket.on("data", async (data: Buffer) => {
    reqeustBuffer = Buffer.concat([reqeustBuffer, data]);

    if (!headerParsed) {
      logger.http(data.toString());
      const headerEndIndex = reqeustBuffer.indexOf("\r\n\r\n");
      if (headerEndIndex !== -1) {
        const headers = reqeustBuffer.subarray(0, headerEndIndex).toString();
        const match = headers.match(/Content-Length:\s*(\d+)/i);
        contentLength = match ? parseInt(match[1], 10) : null;
      }
      headerParsed = true;
    }

    if (
      headerParsed &&
      (contentLength === null || reqeustBuffer.length >= contentLength + reqeustBuffer.indexOf("\r\n\r\n") + 4)
    ) {
      const requestText = reqeustBuffer.toString();
      logger.http(requestText);
      try {
        const request = new Request(requestText);
        const response = await getResponseByUri(request);
        socket.write(response);
        socket.end();
      } catch (e: any) {
        if (e instanceof HttpException) {
          const response = createClientErrorResponse(e.getStatusCode(), e.message);
          socket.write(response);
          socket.end();
          return;
        }

        throw e;
      } finally {
        reqeustBuffer = Buffer.alloc(0);
        contentLength = null;
        headerParsed = false;
      }
    }
  });
});
