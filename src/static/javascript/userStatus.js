export const isLoggedIn = async () => {
  const response = await fetch("/loginCheck", {
    method: "GET",
  });
  const body = await response.text();
  console.log(body);
  if (response.status === 200) {
    if (body === "authorized") return true;
    return false;
  }
  return false;
};
