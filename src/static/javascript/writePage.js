const form = document.querySelector(".upload-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const response = await fetch("/upload", {
    method: "POST",
    body: new FormData(form),
  });

  const result = await response.json();
  console.log(result);
});
