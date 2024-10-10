export const isLoggedIn = async () => {
  const response = await fetch("/loginCheck", {
    method: "GET",
  });

  if (response.statusCode === 200) {
    if (response.body === "authorized") return true;
    return false;
  }
  return false;
};
