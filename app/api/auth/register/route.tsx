import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
var bcrypt = require("bcryptjs");
import { generateUniqueAccountNumber } from "@/helper/generateRandomNumber";

export async function POST(request: NextRequest) {
  const data = await request.json();

  console.log("data: ", data);
  const { password, email, name } = data;
  var salt = await bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT!));
  var hash = await bcrypt.hashSync(password, salt);

  if (!hash) console.log("Unable to Hash Password");

  const account_no = generateUniqueAccountNumber();

  const saveData = {
    email,
    password: hash,
    name,
    account_no,
  };

  try {
    const checkExistingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (checkExistingUser)
      return NextResponse.json({
        status: 500,
        data: "User with same email already register",
      });

    const register = await prisma.user.create({
      data: saveData,
    });

    if (!register) {
      return NextResponse.json({
        status: 500,
        data: "Unable to register user",
      });
    }

    return NextResponse.json({
      message: "Account Open Successfully!!",
      data: {},
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
