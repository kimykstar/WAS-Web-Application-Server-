import { GetMapping, PostMapping } from "../decorator/apiDecorator.ts";
import { lowdbDao } from "../../DB/LowdbDao.ts";
import { User } from "../domain/User.ts";
import { createRedirectionResponse, createResponseByBadRequest } from "../server/responseCreator.ts";
import { StatusCodes } from "http-status-codes";

class UserController {
  @GetMapping("/create")
  signUp({ password, nickName, email }: Record<string, string>) {
    // lowdbDao.insertRecord("user", new User(userId, password, name, email));
    return Buffer.from(`password: ${password}\nname: ${nickName}\nemail: ${email}`);
  }

  @PostMapping("/create")
  postSignUp({ password, nickName, email }: Record<string, string>) {
    lowdbDao.insertRecord("user", new User(password, nickName, email));
    return createRedirectionResponse("/user/index.html");
  }

  @PostMapping("/login")
  async login({ email, password }: Record<string, string>) {
    const record = await lowdbDao.getRecord("user", email);
    if (typeof record === "object" && password === record["password"]) {
      return createRedirectionResponse("/user/index.html");
    }

    return createRedirectionResponse("/user/login_failed.html");
  }
}

export const userController = new UserController();
