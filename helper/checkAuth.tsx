import Cookies from "js-cookie";

export const checkIsLogin = () => {
  const authCookie = Cookies.get("authCookie");
  if (!authCookie) return false;

  return true;
};

