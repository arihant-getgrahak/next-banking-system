import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
var bcrypt = require('bcryptjs');

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { password } = data
    var salt = await bcrypt.genSaltSync(process.env.BCRYPT_SALT!);
    var hash = await bcrypt.hashSync(password, salt);

    try {
        const register = await prisma.user.create({
            data: {
                ...data, hash
            },
        });

        if (!register) {
            return NextResponse.json({
                status: 500,
                data: "Unable to register user",
            });
        }
        return NextResponse.json(register);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}