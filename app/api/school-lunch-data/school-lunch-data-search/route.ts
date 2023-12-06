import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { SchoolLunchDataRepository } from "@/app/_repositories/school-lunch-data/SchoolLunchData";

export async function GET(request: NextRequest, response: NextResponse) {
  const { searchParams } = new URL(request.url);
  const searchParam = searchParams?.get("q");
  const searchParams2 = searchParams?.get("ym");
  const searchYmd = searchParams?.get("ymd");

  try {
    if (searchParam) {
      const schoolLunchData = await SchoolLunchDataRepository.findMany(
        searchParam,
        searchParams2,
        // jyuchuYmdSE,
        searchYmd
      );
      return NextResponse.json(await schoolLunchData);
    } else {
      const schoolLunchData = await SchoolLunchDataRepository.findMany(
        null,
        null,
        null
      );
      return NextResponse.json(await schoolLunchData);
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
