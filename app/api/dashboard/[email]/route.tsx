import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { email: string };
  }
) {
  try {
    const dashboard = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
      select: {
        name: true,
        email: true,
        account_no: true,
        id: true,
        openingBalance: true,
        sentTransaction: true,
        receivedTransaction: true,
      },
    });
    return NextResponse.json({
      message: "Dashboard Content",
      data: dashboard,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
