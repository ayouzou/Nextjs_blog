import { NextResponse  } from "next/server";
import prisma from '../../lib/prismadb'

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return null;
    }
    console.log("currentUser.id", currentUser.id)
    const body = await request.json()

    const { name, description, imageSrc } = body

    try {

        const blog = await prisma.blog.create({
            data: {
                name,
                imageSrc,
                description,
                userId: currentUser.id
            }
        })
        console.log("blog", blog)
        return NextResponse.json(blog)
    } catch (error) {
        console.error("Error creating blog:", error);
    }
} 