import { GetMapping, PostMapping } from "../decorator/apiDecorator.ts";
import { lowdbDao } from "../../DB/LowdbDao.ts";
import { User } from "../domain/User.ts";
import {
  createOkResponse,
  createLoginRedirectionResponse,
  createRedirectionResponse,
  createResponseByBadRequest,
} from "../server/responseCreator.ts";
import Request from "../server/Request.ts";

// ToDo: Request인스턴스만 받아서 모든 컨트롤러에서 받아서 처리하도록
class UserController {
  @GetMapping("/loginCheck")
  loginCheck(empty: Record<string, string>, sessionId: string | undefined) {
    let bodyContent: string = "unauthorized";
    if (sessionId) {
      console.log();
      // ToDo: SessionId검증 로직 추가
      bodyContent = "authorized";
      return bodyContent;
    }
    return bodyContent;
  }

  @PostMapping("/create")
  postSignUp({ password, nickName, email }: Record<string, string>) {
    lowdbDao.insertRecord("user", new User(password, nickName, email));
    return createRedirectionResponse("/index.html");
  }

  @PostMapping("/login")
  async login({ email, password }: Record<string, string>) {
    const record = await lowdbDao.getRecord("user", email);
    if (typeof record === "object" && password === record["password"]) {
      return createLoginRedirectionResponse("/index.html", email);
    }
    return createRedirectionResponse("/user/login_failed.html");
  }
}

export const userController = new UserController();
