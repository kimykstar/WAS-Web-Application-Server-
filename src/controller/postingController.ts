import { StatusCodes } from "http-status-codes";
import { PostMapping } from "../decorator/apiDecorator.ts";
import {
  createOkResponse,
  createServerErrorResponse,
} from "../server/components/helper/responseCreator.ts";
import { writeFile } from "../server/components/middlewares/staticFileManager.ts";
import Request from "../server/httpDomain/Request.ts";

class PostingController {
  @PostMapping("/upload")
  createPosting(request: Request) {
    const reqBody = request.getMultipartBody();
    const [, , file] = reqBody;
    const { filename, data } = file;
    return writeFile(filename, data)
      ? createOkResponse(StatusCodes.CREATED, "", "TEXT_UTF8")
      : createServerErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export const postingController = new PostingController();
