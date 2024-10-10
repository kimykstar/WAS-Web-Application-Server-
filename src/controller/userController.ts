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

class UserController {
  // @GetMapping("/loginCheck")
  // loginCheck(empty: Record<string, string>, authorized: string) {
  //   let bodyContent = "unauthorized";
  //   if (authorized) {
  //     bodyContent = "authorized";
  //     return createOkResponse(Buffer.from(bodyContent), "TEXT_UTF8");
  //   }
  // }

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
