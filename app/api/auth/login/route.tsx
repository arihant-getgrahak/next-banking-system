import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import generateToken from "@/helper/generateToken";

export async function POST(request: NextRequest) {
  const data = await request.json();

console.log(data);

  try {
    const login = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });    

    if (!login) {
      return NextResponse.json({
        status: 500,
        data: "No user find with this credentials",
      });
    }
    const pass = await bcrypt.compareSync(data.password, login.password);
    if (!pass)
      return NextResponse.json({
        status: 500,
        data: "Invalid Password!!",
      });

    const returnData = {
      ...login,
      password: undefined,
    };

    return NextResponse.json({
      message: "Login Successfully",
      data: returnData,
      token: generateToken(returnData.email),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
