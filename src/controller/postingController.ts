import { PostMapping } from "../decorator/apiDecorator.ts";
import { writeFile } from "../server/components/middlewares/staticFileManager.ts";
import Request from "../server/httpDomain/Request.ts";

class PostingController {
  @PostMapping("/upload")
  createPosting(request: Request) {
    // upload data를 저장하는 로직 작성
    // console.log(request);
    const reqBody = request.getMultipartBody();
    const [, , file] = reqBody;
    const { filename, data } = file;
    writeFile(filename, data);
  }
}

export const postingController = new PostingController();
