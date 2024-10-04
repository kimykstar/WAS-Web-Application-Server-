class Header extends HTMLElement{

  connectedCallback() {
    this.setAttribute('class', 'navbar');
    this.innerHTML = `
      <div>HELLO, WEB!</div>
      <button type="button" class="signupBtn">로그인/회원가입</button>
    `;
    this.#addHandlers();
  }

  #addHandlers() {
    this.querySelector('.signupBtn')
      .addEventListener('click', () => {
        location.assign('/user/login.html');
      })
  }

}

customElements.define('page-header', Header);