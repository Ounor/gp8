import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { ZodError } from "zod";
//
// export async function POST(req: Request, res: Response) {
//     const {data} = req.body; // Your request's body
//     console.log(req, res );
//     //  await prisma.visit.create({
//     //     data: {
//     //         patientId: req.body.patientId,
//     //         visitDate: req.body.visitDate,
//     //         nextVisitDate: req.body.nextVisitDate,
//     //         pregnancyPeriod: req.body.teeBodyWeight,
//     //         bodyWeight: req.body.bodyWeight,
//     //     }
//     // })
//
//
//     return NextResponse.json({
//         req: 11
//     });
// }

export async function POST(request: Request) {
    try {
        const { patientId, visitDate, nextVisitDate, bodyWeight, pregnancyPeriod, familyValue, phoneValue,} =
            await request.json();

        const result = {
            patientId, visitDate, nextVisitDate, bodyWeight, pregnancyPeriod, familyValue, phoneValue
        };

         await prisma.visit.create({
            data: {
                ...result
            }
        })

        return NextResponse.json({ data: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" });
    }
}

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('patientId')

    const patient = await prisma.patient.findUnique({
        where: {
            id: id
        },
    })

    const visits = await prisma.visit.findMany({
        where: {
            patientId: id
        },
    })

    return NextResponse.json({
        patient,
        visits
    });
}


