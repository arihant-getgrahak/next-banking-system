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
      orderBy: {
        transfer_date: "desc",
      },
    });

    const formattedTransactions = result
      .map((transaction) => {
        if (transaction.sender_acc_no === params.userId) {
          if (transaction.method === "CREDIT") return null;
          return {
            date: transaction.transfer_date,
            id: transaction.id,
            amount: transaction.amount,
            type: transaction.type,
            acc_no: transaction.receiver_acc_no,
            method: "DEBIT",
          };
        } else if (transaction.receiver_acc_no === params.userId) {
          if (transaction.method === "DEBIT") return null;
          return {
            date: transaction.transfer_date,
            id: transaction.id,
            amount: transaction.amount,
            type: transaction.type,
            acc_no: transaction.receiver_acc_no,
            method: "CREDIT",
          };
        }
        return null;
      })
      .filter((tx) => tx !== null);

    return NextResponse.json({
      message: "Transaction",
      data: formattedTransactions,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
