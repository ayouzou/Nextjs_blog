import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

import prisma from '../../lib/prismadb'

export async function POST(
    request: Request,
) {
    try {
        const body = await request.json();

        const { email, name, password } = body;

        if (!email || !name || !password) {
            return NextResponse.json({
                error: "Invalid input. Please provide email, name, and password.",
            }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return NextResponse.json({
                error: "Email is already in use. Please choose another.",
            }, { status: 400 });
        }


        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({
            error: "Internal server error.",
        }, { status: 500 });
    }

}