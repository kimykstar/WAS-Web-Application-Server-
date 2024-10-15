import "./header.js";
import "./inputBox.js";

document.querySelector(".login-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = getLoginFormData();
  try {
    const response = await fetch("/login", {
      method: "POST",
      body: formData,
    });
    const token = await response.text();
    if (response.status === 200) {
      localStorage.setItem("token", token);
      location.assign("/index.html");
    } else if (response.status === 401) {
      alert("아이디 혹은 비밀번호가 틀렸습니다.");
    }
  } catch (error) {
    console.error(error);
  }
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

  return searchParams.toString();
};
