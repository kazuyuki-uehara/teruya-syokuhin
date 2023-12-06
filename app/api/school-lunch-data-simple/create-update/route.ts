
import { SchoolLunchDataRepository } from "@/app/_repositories/SchoolLunchData";
import { schoolLunchData } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// export async function POST(request: NextRequest) {
//     try {
//         const reqBody =await request.json()
//         const shoHinCD = reqBody.syohinCd
//         // console.log(shoHinCD)
//         // shoHinCD探します。
//         const searchShoHinCd = await SchoolLunchDataRepository.selectShoHinCD(shoHinCD)
//         console.log("Search ShoHinCD",searchShoHinCd)
//         // insert or update
//         if (searchShoHinCd) {
//             console.log('in')
//             /*shoHinCDあれば、更新する */
//             // update logic
//             const updateData = {...searchShoHinCd,...reqBody,updatedAt:new Date()}
//             const id = updateData.id
//             // console.log(id)
//             const updateResult = await SchoolLunchDataRepository.update(id,updateData)
//             // console.log(updateResult)
//             return NextResponse.json({noCaseResult:updateResult}, { status: 200 });
//         }
//         /* shoHinCDなければ、新しいrecordを作成する,Insert Process */
//         const newMSLC = await SchoolLunchDataRepository.create(reqBody);
//         return NextResponse.json(newMSLC, { status: 201 });
//     }catch(e){
//         return NextResponse.json(
//             { error: "Internal Server Error 1" },
//             { status: 500 }
//         );
//     }
// }