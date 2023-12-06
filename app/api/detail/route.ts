import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/app/_utils/prismaSingleton';
import { SchoolLunchDataRepository } from '@/app/_repositories/SchoolLunchData';
import { Dayjs } from 'dayjs';

export async function GET(request: NextRequest) {
    try{
        // get all data from database via model
        const details = await SchoolLunchDataRepository.details(new Date("2023-09-14 09:00:00"))
        return NextResponse.json(details)
    }catch(e){
        return NextResponse.json({message:"detail error"},{status:500})
    }
}