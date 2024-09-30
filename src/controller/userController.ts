import { getMapping } from "../decorator/apiDecorator.ts";
// import { lowdbDao } from "../../DB/LowdbDao.ts";
import { User } from "../domain/User.ts";

class UserController {
  @getMapping("/create")
  signUp({ userId, password, name, email }: Record<string, string>) {
    // lowdbDao.insertRecord("user", new User(userId, password, name, email));
    return Buffer.from(`id: ${userId}\npassword: ${password}\nname: ${name}\nemail: ${email}`);
  }
}

export const userController = new UserController();
