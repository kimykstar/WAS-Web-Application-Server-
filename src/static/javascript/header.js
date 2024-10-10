import { isLoggedIn } from "./userStatus.js";

class Header extends HTMLElement {
  async connectedCallback() {
    this.setAttribute("class", "navbar");
    const flag = await isLoggedIn();
    console.log(flag);
    if (flag) {
      this.innerHTML = `
        <div>HELLO, WEB!</div>
        <div class='rightContainer'>
          <p>멤버리스트</p>
          <button type="button" class="myPageBtn">마이페이지</button>
          <button type="button" class="logOutBtn">로그아웃</button>
        </div>
      `;
      return;
    }
    this.innerHTML = `
      <div>HELLO, WEB!</div>
      <button type="button" class="signupBtn">로그인/회원가입</button>
    `;
    this.#addHandlers();
  }

  #addHandlers() {
    this.querySelector(".signupBtn").addEventListener("click", () => {
      location.assign("/user/login.html");
    });
  }
}

customElements.define("page-header", Header);
