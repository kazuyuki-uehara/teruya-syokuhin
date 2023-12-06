import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/app/_utils/prismaSingleton';
import { SchoolLunchDataRepository } from '@/app/_repositories/SchoolLunchData';

export async function GET(request: NextRequest) {
    try{
        // get all data from database via model
        const schoolLunchData = await SchoolLunchDataRepository.findMany()
        return NextResponse.json(schoolLunchData)
    }catch(e){
        return NextResponse.json({message:"error"},{status:500})
    }
}

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json()
        return NextResponse.json({message : "success",result : reqBody})
        
    }catch(e){
        return NextResponse.json({message:"error"},{status:500})
    }
}