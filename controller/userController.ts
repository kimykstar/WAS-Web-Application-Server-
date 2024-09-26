import { getMapping } from "../decorator/apiDecorator";

class UserController {
  @getMapping("/create")
  signUp({ userId, password, name, email }: Record<string, string>) {
    return Buffer.from(`id: ${userId}\npassword: ${password}\nname: ${name}\nemail: ${email}`);
  }
}

export const userController = new UserController();
