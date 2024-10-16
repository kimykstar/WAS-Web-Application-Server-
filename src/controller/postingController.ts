import { PostMapping } from "../decorator/apiDecorator.ts";
import { writeFile } from "../server/components/middlewares/staticFileManager.ts";
import Request from "../server/httpDomain/Request.ts";

class PostingController {
  @PostMapping("/upload")
  createPosting(request: Request) {
    const reqBody = request.getMultipartBody();
    const [, , file] = reqBody;
    const { filename, data } = file;
    console.log("savelength---> ", data.length);
    writeFile(filename, data);
  }
}

export const postingController = new PostingController();
