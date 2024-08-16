import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { TokenType } from "@/types/tokenType";

async function generateToken(params: TokenType) {
  const token = jwt.sign(
    {
      data: params,
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
