import { SchoolLunchDataRepository } from '@/app/_repositories/school-lunch-data/SchoolLunchData';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// SchoolLunchDataRepository

export async function GET(request: NextRequest) {
    try{
        // get all data from database via model
        const schoolLunchData = await SchoolLunchDataRepository.findMany(null,null,null)
        return NextResponse.json(schoolLunchData)
    }catch(e){
        return NextResponse.json({message:"error"},{status:500})
    }
}

export async function POST(request: NextRequest) {
   
    try {
      const reqBody = await request.json();
      console.log("body sdfsdf >>",reqBody)
      return NextResponse.json({ reqBody }, { status: 200 });
      
    //   const tokuisakiCd = reqBody.tokuisakiCd;
    //   //  shoHinCD探します
    //   const searchTokuisakiCd = await SchoolLunchDataRepository.selectTokuisakiCd(
    //     tokuisakiCd
    //   );
    //   // console.log("Search ShoHinCD",searchTokuisakiCd)
    //   // insert or update
    //   if (searchTokuisakiCd) {
    //     /*shoHinCDあれば、更新する */
    //     // update logic
    //     const updateData = {
    //       ...searchTokuisakiCd,
    //       ...reqBody,
    //       updated_at: new Date(),
    //     };
    //     const id = updateData.id;
    //     const updateResult = await SchoolLunchDataRepository.update(
    //       id,
    //       updateData
    //     );
    //     return NextResponse.json({ noCaseResult: updateResult }, { status: 200 });
    //   }
      /* shoHinCDなければ、新しいrecordを作成する,Insert Process */
    //   const newSchoolLunchData = await SchoolLunchDataRepository.create(reqBody);
    //   return NextResponse.json(newSchoolLunchData, { status: 201 });
    } catch (e) {
      console.log("error : ",e)
      return NextResponse.json({ message: "error" }, { status: 500 });
    }
  }