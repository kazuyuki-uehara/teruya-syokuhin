import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/app/_utils/prismaSingleton';
import { SchoolLunchDataRepository } from '@/app/_repositories/SchoolLunchData';

export async function GET(request: NextRequest) {
    try{
        // get all data from database via model
        const subTotal = await SchoolLunchDataRepository.GrandTotal()
        return NextResponse.json(subTotal)
    }catch(e){
        return NextResponse.json({message:"grandTotal error"},{status:500})
    }
}