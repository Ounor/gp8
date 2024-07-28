import {NextResponse} from "next/server";
import prisma from "@/prisma/prisma";
import {ZodError} from "zod";
import dayjs from "dayjs";

// export async function POST(req: Request, res: Response) {
//
// }

export async function POST(request: Request) {
    try {
        const {
            firstName,
            middleName,
            secondName,
            phone,
            birthDay,
            createdAt,
            updatedAt,
        } = await request.json();

        const result = {
            firstName,
            middleName,
            secondName,
            phone,
            birthDay,
            createdAt,
            updatedAt,
        };

        await prisma.patient.create({
            data: {
                firstName,
                middleName,
                secondName,
                phone,
                notes: '',
                birthDay
            }
        })

        return NextResponse.json({data: result}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"});
    }
}

export async function GET(req: Request, res: Response) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('userId')

    const patients = await prisma.patient.findMany();

    return NextResponse.json({
        patients
    });


}
