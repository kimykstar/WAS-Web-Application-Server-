import { header } from "../component/header.js";

export const render = () => {
  document.body.innerHTML = header.getHeader();
};

render();
