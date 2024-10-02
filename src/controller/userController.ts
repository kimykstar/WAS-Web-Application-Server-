import { GetMapping, PostMapping } from "../decorator/apiDecorator.ts";
// import { lowdbDao } from "../../DB/LowdbDao.ts";
import { User } from "../domain/User.ts";

class UserController {
  @GetMapping("/create")
  signUp({ userId, password, nickName, email }: Record<string, string>) {
    // lowdbDao.insertRecord("user", new User(userId, password, name, email));
    return Buffer.from(`id: ${userId}\npassword: ${password}\nname: ${nickName}\nemail: ${email}`);
  }

  @PostMapping("/create")
  postSignUp({ userId, password, nickName, email }: Record<string, string>) {
    // lowdbDao.insertRecord("user", new User(userId, password, name, email));
    return Buffer.from(`id: ${userId}\npassword: ${password}\nname: ${nickName}\nemail: ${email}`); 
  }
}

export const userController = new UserController();
