import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  try {
    const result = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            sender_acc_no: params.userId,
          },
          {
            receiver_acc_no: params.userId,
          },
        ],
      },
    });
    
    return NextResponse.json({
      message: "Transaction",
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
