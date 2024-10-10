import "./header.js";
import "./inputBox.js";

document.querySelector(".loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = getLoginFormData();
  const response = await fetch("/login", {
    method: "POST",
    body: formData,
  });
  handleLoginResponse(response);
});

const getLoginFormData = () => {
  const formData = [];
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    const key = input.getAttribute("name");
    const value = input.value;
    formData.push([key, value].join("="));
  });

  return formData.join("&");
};

const handleLoginResponse = (response) => {
  const statusCode = response.status;

  if (statusCode === 200) {
    const redirectionPath = response.url;
    window.location.assign(redirectionPath);
  }
};
