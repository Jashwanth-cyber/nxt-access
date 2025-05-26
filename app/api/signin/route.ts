import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma"; 
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

   
    const user = await prisma.user.findUnique({
        where: { email: username },
    });

    if (!user) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

   
    if (!user.hashedpassword) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedpassword);
    if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

   
    return NextResponse.json({ success: true, user: { id: user.id, email: user.email }, redirect: "/dashboard" });
}