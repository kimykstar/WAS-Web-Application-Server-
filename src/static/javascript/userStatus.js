export const isLoggedIn = async () => {
  try {
    const response = await fetch("/loginCheck", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const body = await response.text();
    if (response.status === 200) {
      return body === "authorized";
    } else if (response.status === 403) {
      console.log("비로그인 상태");
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};
