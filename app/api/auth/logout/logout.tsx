import { NextRequest, NextResponse } from "next/server";
import { deleteToken } from "@/helper/TokenHelper";

export async function GET(request: NextRequest) {
  // await deleteToken();

  return NextResponse.json({ message: "Logout Successfully" });
}
