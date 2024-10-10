export const isLoggedIn = async () => {
  const response = await fetch("/loginCheck", {
    method: "GET",
  });

  if (response.statusCode === 200) {
    return true;
  }
  return false;
};
