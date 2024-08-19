import { EmailTemplate } from "@/components/emailTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateOTP } from "@/helper/generateRandomNumber";
import prisma from "@/lib/prisma";
import { isDateExpired } from "@/helper/checkOtpExp";

const resend = new Resend(process.env.RESEND_API?.toString());

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  // Data required
  // email id + OTP
  // here email coming from params and OTP coming from func
  try {
    if (!params.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const otp = generateOTP();

    const Expdate = new Date(Date.now() + 1000 * 60 * 5);
    const saveOtp = await prisma.otp.create({
      data: {
        user_otp: params.email,
        otp: otp,
        otpExp: Expdate,
      },
    });
    if (!saveOtp)
      return NextResponse.json({ error: "error saving OTP" }, { status: 500 });

    const { data, error } = await resend.emails.send({
      from: "Arihant <email-verfication@resend.dev>",
      to: [params.email],
      subject: "Otp for Email Verification",
      react: EmailTemplate({ OTP: parseInt(otp) }),
    });

    if (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }

    return NextResponse.json(
      { data: "Please Check your email for the OTP" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    // data contains otp
    // params contains email
    const data = await req.json();
    const fetchOtp = await prisma.otp.findFirst({
      where: {
        otp: data.otp,
        user_otp: params.email,
      },
    });

    if (!fetchOtp)
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

    if (!isDateExpired(fetchOtp?.otpExp!))
      return NextResponse.json({ error: "OTP Expired" }, { status: 400 });

    return NextResponse.json(
      { data: "OTP Verified", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
