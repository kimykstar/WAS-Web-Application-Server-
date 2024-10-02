import { header } from "../component/header.js";

export const render = () => {
  document.body.prepend(header.getHeader());
};

render();
