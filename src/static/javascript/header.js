import { isLoggedIn } from "./userStatus.js";

class Header extends HTMLElement {
  async connectedCallback() {
    this.setAttribute("class", "navbar");
    const flag = await isLoggedIn();
    if (flag) {
      this.innerHTML = `
        <div>HELLO, WEB!</div>
        <div class='rightContainer'>
          <p>멤버리스트</p>
          <button type="button" class="myPageBtn">마이페이지</button>
          <button type="button" class="logOutBtn">로그아웃</button>
        </div>
      `;
      this.#addLogOutHandlers();
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

  #addLogOutHandlers() {
    console.log(this.querySelector(".logOutBtn"));
    this.querySelector(".logOutBtn").addEventListener("click", async () => {
      const token = sessionStorage.getItem("token");
      const response = await fetch("/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        sessionStorage.removeItem("token");
        location.reload();
      }
    });
  }
}

customElements.define("page-header", Header);
