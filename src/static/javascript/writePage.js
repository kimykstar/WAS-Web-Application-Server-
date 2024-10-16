// document.getElementById("upload-form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const formData = new FormData(this);

//   formData.delete("file");

//   const fileInput = document.getElementById("file-input");
//   if (fileInput.files && fileInput.files[0]) {
//     const reader = new FileReader();

//     reader.onload = function (e) {
//       const base64Image = e.target.result;

//       // Base64 인코딩된 이미지를 FormData에 추가
//       formData.append("base64Image", base64Image);

//       // 서버로 데이터 전송
//       fetch("/upload", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Success:", data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     };

//     reader.readAsDataURL(fileInput.files[0]);
//   } else {
//     // 이미지가 없는 경우에도 폼 데이터 전송
//     fetch("/upload", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Success:", data);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }
// });
