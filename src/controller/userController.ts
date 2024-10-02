import { GetMapping, PostMapping } from "../decorator/apiDecorator.ts";
import { lowdbDao } from "../../DB/LowdbDao.ts";
import { User } from "../domain/User.ts";

class UserController {
  @GetMapping("/create")
  signUp({ userId, password, nickName, email }: Record<string, string>) {
    // lowdbDao.insertRecord("user", new User(userId, password, name, email));
    return Buffer.from(`password: ${password}\nname: ${nickName}\nemail: ${email}`);
  }

  @PostMapping("/create")
  postSignUp({ userId, password, nickName, email }: Record<string, string>) {
    lowdbDao.insertRecord("user", new User(userId, password, nickName, email));
    return Buffer.from(`password: ${password}\nname: ${nickName}\nemail: ${email}`); 
  }

  @PostMapping("/login")
  async login({email, password}: Record<string, string>) {
    await lowdbDao.getRecord("user", email);
  }
}

export const userController = new UserController();
