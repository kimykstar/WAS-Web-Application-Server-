import { header } from "../../component/header.js";

const signUpPage: HTMLElement = document.body;
describe("Sign up page Test", () => {
  it("Sign Up page Header render Test", () => {
    signUpPage.innerHTML = header.getTemplate();
    expect(signUpPage.querySelector(".navbar")).not.toBe(null);
  });
});
