class Header extends HTMLElement {
  #session;

  connectedCallback() {
    this.#session = this.#getCurrentSession();
    this.setAttribute("class", "navbar");
    if (this.#session) {
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

  #getCurrentSession() {
    const cookies = document.cookie;
    cookies
      .split(";")
      .map((cookie) => cookie.split("="))
      .find(([key, value]) => key === "session_id");
  }

  #addHandlers() {
    this.querySelector(".signupBtn").addEventListener("click", () => {
      location.assign("/user/login.html");
    });
  }
}

customElements.define("page-header", Header);
console.log(document.cookie);
