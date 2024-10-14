import { isLoggedIn } from "./userStatus.js";

class Header extends HTMLElement {
  async connectedCallback() {
    this.setAttribute("class", "navbar");
    const flag = await isLoggedIn();
    if (flag) {
      this.innerHTML = `
        <div>HELLO, WEB!</div>
        <div class='right-container'>
          <p>멤버리스트</p>
          <button type="button" class="mypage-btn">마이페이지</button>
          <button type="button" class="logout-btn">로그아웃</button>
        </div>
      `;
      this.#addLogOutHandlers();
      return;
    }
    this.innerHTML = `
      <div>HELLO, WEB!</div>
      <button type="button" class="signup-btn">로그인/회원가입</button>
    `;
    this.#addHandlers();
  }

  #addHandlers() {
    this.querySelector(".signup-btn").addEventListener("click", () => {
      location.assign("/user/login.html");
    });
  }

  #addLogOutHandlers() {
    this.querySelector(".logout-btn").addEventListener("click", async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
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
      }
    });
  }
}

customElements.define("page-header", Header);
