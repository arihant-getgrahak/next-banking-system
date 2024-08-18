import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function generateToken(email: string, id: string) {
  const token = jwt.sign(
    {
      data: {
        email,
        id,
      },
    },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );

  cookies().set({
    name: "authCookie",
    value: token,
    // httpOnly: true,
    path: "/",
  });
}

export async function deleteToken() {
  cookies().delete("authCookie");
  return true;
}

export default {
  generateToken,
  deleteToken,
};
