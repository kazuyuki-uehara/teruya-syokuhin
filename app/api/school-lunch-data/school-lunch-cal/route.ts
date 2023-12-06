import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/app/_utils/prismaSingleton";
import { SchoolLunchCalRepository } from "@/app/_repositories/SchoolLunchCal";

export async function GET(request: NextRequest) {
  try{
      // get all data from database via model
      const schoolLunchCal = await SchoolLunchCalRepository.findMany()
      return NextResponse.json(schoolLunchCal)
  }catch(e){
      return NextResponse.json({message:"error"},{status:500})
  }
}


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const shoHinCD = reqBody.syohinCd;
    //  shoHinCD探します
    const searchShoHinCd = await SchoolLunchCalRepository.selectShoHinCD(
      shoHinCD
    );
    // console.log("Search ShoHinCD",searchShoHinCd)
    // insert or update
    if (searchShoHinCd) {
      /*shoHinCDあれば、更新する */
      // update logic
      const updateData = {
        ...searchShoHinCd,
        ...reqBody,
        updated_at: new Date(),
      };
      const id = updateData.id;
      const updateResult = await SchoolLunchCalRepository.update(
        id,
        updateData
      );
      return NextResponse.json({ noCaseResult: updateResult }, { status: 200 });
    }
    /* shoHinCDなければ、新しいrecordを作成する,Insert Process */
    const newMSLC = await SchoolLunchCalRepository.create(reqBody);
    return NextResponse.json(newMSLC, { status: 201 });
  } catch (e) {
    // console.log("error : ",e)
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
