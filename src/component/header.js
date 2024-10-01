class Header {
  #template;

  constructor() {
    this.#template = `
      <header class="navbar">
        <div>HELLO, WEB!</div>
        <button type="button" class="signupBtn">로그인/회원가입</button>
      </header>
    `;
  }

  getTemplate() {
    return this.#template;
  }
}

export const header = new Header();
