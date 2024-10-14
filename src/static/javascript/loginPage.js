import { URLSearchParams } from "url";
import "./header.js";
import "./inputBox.js";

document.querySelector(".loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = getLoginFormData();
  const response = await fetch("/login", {
    method: "POST",
    body: formData,
  });
  await handleLoginResponse(response);
});

const getLoginFormData = () => {
  const formData = [];
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    const key = input.getAttribute("name");
    const value = input.value;
    formData.push([key, value]);
  });
  const searchParams = new URLSearchParams(formData);

  return searchParams.toString;
};

const handleLoginResponse = async (response) => {
  const statusCode = response.status;
  const token = await response.text();
  if (statusCode === 200) {
    sessionStorage.setItem("token", token);
    window.location.assign("/index.html");
  }
};
