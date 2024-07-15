import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { ZodError } from "zod";

export async function GET() {
    const users = await prisma.user.findMany();

    return NextResponse.json({
        users
    });


}
