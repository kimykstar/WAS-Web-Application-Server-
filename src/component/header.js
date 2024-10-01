class Header {
  #container;
  #body;

  constructor() {
    this.#container = document.createElement(header);
    this.#container.setAttribute('class', 'navbar');
    this.#body = `
      <div>HELLO, WEB!</div>
      <button type="button" class="signupBtn">로그인/회원가입</button>
    `;
    this.#container.innerHTML = this.#body;
  }

  getHeader() {
    return this.#container;
  }
}

export const header = new Header();
