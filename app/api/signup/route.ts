import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma"; // Adjust path if needed
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }
    const existingUser = await prisma.user.findUnique({
        where: { email: username },
    });
    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: username.split("@")[0],
            email: username,
            hashedpassword: hashedPassword,
        },
    });

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
}