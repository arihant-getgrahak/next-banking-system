import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { name: string };
  }
) {
  try {
    const dashboard = await prisma.user.findMany({
      where: {
        name: params.name,
      },
    });
    return NextResponse.json({
      message: "Dashboard Content",
      data: dashboard[0],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
