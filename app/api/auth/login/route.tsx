import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
var bcrypt = require("bcryptjs");

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const register = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!register) {
      return NextResponse.json({
        status: 500,
        data: "No user find with this credentials",
      });
    }
    const pass = await bcrypt.compareSync(data.password, register.password);
    if (!pass)
      return NextResponse.json({
        status: 500,
        data: "Invalid Password!!",
      });
    return NextResponse.json(register);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
