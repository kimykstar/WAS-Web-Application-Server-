// export const isLoggedIn = async () => {
//   const response = await fetch("/loginCheck", {
//     method: "GET",
//   });
//   const body = await response.text();
//   if (response.status === 200) {
//     if (body === "authorized") return true;
//     return false;
//   }
//   return false;
// };

export const isLoggedIn = async () => {
  const response = await fetch("/loginCheck", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  const body = await response.text();
  if (response.status === 200) {
    if (body === "authorized") return true;
    return false;
  }
  return false;
};
