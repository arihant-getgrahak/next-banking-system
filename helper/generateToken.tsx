import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function generateToken(email: string) {
  const token = jwt.sign(
    {
      data: email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  cookies().set({
    name: "authCookie",
    value: token,
    httpOnly: true,
    path: "/",
  });
}
