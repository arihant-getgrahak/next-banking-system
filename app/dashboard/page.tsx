import { checkIsLogin } from "@/helper/checkAuth";

export default function DasHome() {
  const isLogin = checkIsLogin();
  return <h1>Dashboard Home</h1>;
}
