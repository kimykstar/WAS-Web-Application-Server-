import { GetMapping, PostMapping } from "../decorator/apiDecorator.ts";
import { lowdbDao } from "../../DB/LowdbDao.ts";
import { User } from "../domain/User.ts";
import {
  createRedirectionResponse,
  createUserTokenResponse,
  createOkResponse,
  createUnAuthResponse,
  createForbiddenResponse,
} from "../server/components/helper/responseCreator.ts";
import Request from "../server/httpDomain/Request.ts";
import { sessionManager } from "../server/components/helper/SessionManager.ts";

class UserController {
  @GetMapping("/loginCheck")
  loginCheck(request: Request) {
    const authHeader = request.getRequestHeader("Authorization");
    const [type, token] = authHeader?.split(" ") ?? [];
    let bodyContent: string = "unauthorized";
    if (token !== "null" && sessionManager.isExistSession(token)) {
      bodyContent = "authorized";
      return createOkResponse(bodyContent, "TEXT_UTF8");
    }
    return createForbiddenResponse();
  }

  @GetMapping("/logout")
  logout(request: Request) {
    const authHeader = request.getRequestHeader("Authorization");
    const [type, token] = authHeader?.split(" ") ?? [];
    let bodyContent = "success";
    if (token !== "null" && sessionManager.isExistSession(token)) {
      sessionManager.deleteSession(token);
      bodyContent = "success";
    }
    return createOkResponse(bodyContent, "TEXT_UTF8");
  }

  @PostMapping("/create")
  postSignUp({ password, nickName, email }: Record<string, string>) {
    lowdbDao.insertRecord("user", new User(password, nickName, email));
    return createRedirectionResponse("/index.html");
  }

  @PostMapping("/login")
  async login(request: Request) {
    const { email, password } = request.getBodyContent();
    const record = await lowdbDao.getRecord("user", email);
    if (typeof record === "object" && password === record["password"]) {
      return createUserTokenResponse("/index.html", email);
    }
    return createUnAuthResponse();
  }
}

export const userController = new UserController();
