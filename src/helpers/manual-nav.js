import decode from "jwt-decode";

export default () => {
  const token = sessionStorage.getItem("token");
  if (!!token) {
    const tokenData = decode(token);

    switch (tokenData.data.user_type) {
      case "student":
        return "/student";
      case "admin":
        return "/student";
      case "teacher":
        return "/student";
    }
  } else {
    return "/login";
  }
};
