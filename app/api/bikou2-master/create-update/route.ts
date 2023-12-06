import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Biko2MasterRepository } from "@/app/_repositories/bikou2-master/Bikou2Master";

export async function GET(request: NextRequest) {
  try {
    // get all data from database via model
    const bikou2MasterAllData = await Biko2MasterRepository.findMany();
    return NextResponse.json(bikou2MasterAllData);
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    let createArray: any = [];
    let deleteSkip = true;

    reqBody.map((d: any) => {
      if(d.id != null){
        deleteSkip = false
      }
      const obj = {
        // bikoCd: d.bikoCd,
        tokuisakiCd: d.tokuisakiCd,
        syohinCd: d.syohinCd,
        mongon: d.mongon,
      };
      createArray.push(obj);
    });
    
    const deleteResult = await Biko2MasterRepository.deleteMany(deleteSkip);
    const result = await Biko2MasterRepository.createMany(createArray);
    return NextResponse.json(
      {
        message: "success",
        result1: result,
        result2:deleteResult,
      },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
