import { isLoggedIn } from "./userStatus.js";

class Header extends HTMLElement {
  connectedCallback() {
    this.setAttribute("class", "navbar");
    if (isLoggedIn()) {
      this.innerHTML = `
        <div>HELLO, WEB!</div>
        <div>
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
