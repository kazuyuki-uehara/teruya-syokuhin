import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/app/_utils/prismaSingleton';
import { SchoolLunchDataRepository } from "@/app/_repositories/school-lunch-data/SchoolLunchData";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const searchParam = searchParams?.get("q");
    const searchParams2 = searchParams?.get("ym");
    const searchYmd = searchParams?.get("ymd");

    try {
        if (searchParam) {
          const subTotal = await SchoolLunchDataRepository.subTotal(
            searchParam,
            searchParams2,
            // jyuchuYmdSE,
            searchYmd
          );
          return NextResponse.json(await subTotal);
        } else {
          const subTotal = await SchoolLunchDataRepository.subTotal(
            null,
            null,
            null
          );
          return NextResponse.json(await subTotal);
        }
      } catch (e) {
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
}