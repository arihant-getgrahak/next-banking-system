import { checkIsLogin } from "@/helper/checkAuth";

export default function DasHome() {
  if (!checkIsLogin()) {
    return <h1>Unauthorized</h1>;
  }
  return <h1>Dashboard Home</h1>;
}
