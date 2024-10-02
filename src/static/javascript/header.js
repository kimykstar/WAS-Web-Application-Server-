class Header extends HTMLElement{

  connectedCallback() {
    this.setAttribute('class', 'navbar');
    this.innerHTML = `
      <div>HELLO, WEB!</div>
      <button type="button" class="signupBtn">로그인/회원가입</button>
    `;
  }

}

customElements.define('page-header', Header);