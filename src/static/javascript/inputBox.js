class InputBox extends HTMLElement {
  connectedCallback() {
    const inputPlaceHolder = this.getAttribute("placeholder");
    const inputTitle = inputPlaceHolder.substring(0, inputPlaceHolder.search(/을|를/));
    const inputType = this.getAttribute("type");
    const inputName = this.getAttribute("name");
    this.innerHTML = `
      <p class='inputTitle'>${inputTitle}</p>
      <input type="${inputType}" name="${inputName}" placeholder="${inputPlaceHolder}"/>
    `;
  }
}

customElements.define("form-input", InputBox);
