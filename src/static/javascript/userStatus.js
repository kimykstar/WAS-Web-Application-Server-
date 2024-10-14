export const isLoggedIn = async () => {
  const response = await fetch("/loginCheck", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  const body = await response.text();
  if (response.status === 200) {
    return body === "authorized";
  }
  return false;
};
