import { isLoggedIn } from "./userStatus.js";
document.querySelector(".write-btn").addEventListener("click", async () => {
  // 로그인 여부에 따라 동작
  if (await isLoggedIn()) {
    location.assign("../write.html");
  } else {
    alert("로그인이 필요합니다.");
    location.assign("../user/login.html");
  }
});
