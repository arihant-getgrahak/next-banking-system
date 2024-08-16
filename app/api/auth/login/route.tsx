import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
var bcrypt = require("bcryptjs");

export async function POST(request: NextRequest) {
  const data = await request.json();

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
    return NextResponse.json(login);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
