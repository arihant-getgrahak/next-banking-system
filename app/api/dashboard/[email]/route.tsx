import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { deleteToken } from "@/helper/TokenHelper";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { email: string };
  }
) {
  try {
    const dashboard = await prisma.user.findMany({
      where: {
        OR: [{ id: params.email }, { email: params.email }],
      },
      select: {
        name: true,
        email: true,
        account_no: true,
        id: true,
        openingBalance: true,
        currentBalance: true,
        sentTransaction: true,
        receivedTransaction: true,
      },
    });

    if (!dashboard)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      message: "Dashboard Content",
      data: dashboard[0],
    },{
      status: 200
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PATCH(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const data = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: params.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = bcrypt.compareSync(data.old, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT!));
    const hashedPassword = bcrypt.hashSync(data.new, salt);

    const updatedUser = await prisma.user.update({
      where: { id: params.email },
      data: { password: hashedPassword },
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Error updating password" },
        { status: 500 }
      );
    }

    await deleteToken();

    return NextResponse.json(
      { message: "Password Updated", data: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: { email: string };
  }
) {
  try {
    let data;
    try {
      data = await request.json();
    } catch (err: any) {
      return NextResponse.json(
        { error: "Please provide some data..." },
        { status: 500 }
      );
    }
    const CheckIsUserExist = await prisma.user.findUnique({
      where: {
        id: params.email,
      },
    });

    if (!CheckIsUserExist)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const updateUser = await prisma.user.update({
      where: {
        id: params.email,
      },
      data: data,
    });

    if (!updateUser)
      return NextResponse.json(
        { error: "Error updating user name" },
        { status: 500 }
      );

    return NextResponse.json(
      {
        message: "User Updated",
        data: updateUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
