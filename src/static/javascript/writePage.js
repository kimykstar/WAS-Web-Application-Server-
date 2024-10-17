const form = document.querySelector(".upload-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const response = await fetch("/upload", {
    method: "POST",
    body: new FormData(form),
  });

  if (response.status === 200) {
    alert("글쓰기가 완료되었습니다.");
    location.assign("/index.html");
  } else {
    alert("글쓰기가 실패하였습니다(Error: 500 Server Error)");
    location.assign("/index.html");
  }
});
