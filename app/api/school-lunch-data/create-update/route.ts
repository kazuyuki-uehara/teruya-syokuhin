import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SchoolLunchDataRepository } from "@/app/_repositories/school-lunch-data/SchoolLunchData";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paramTokisaki = searchParams?.get("tokuisakiCd") as string;
    const paramJyuchymd = searchParams?.get("jyuchuYmd") as string;
    // const searchTokuisaki = searchParams?.get("searchTokuisaki") as string;
    const reqBody = await request.json();
    // console.log(searchTokuisaki == paramTokisaki);
    let createArray: any = [];
    let updateArray: any = [];
    let deleteArray: any = [];
    let deleteSkip = true
    
    reqBody.map((d: any) => {
      if(d.id != null){
        deleteSkip = false
      }
      const obj = {
        tokuisakiCd: d.tokuisakiCd,
        tokuisakiName: d.tokuisakiName,
        jyuchuYmd: d.jyuchuYmd,
        nouhinYmd: d.nouhinYmd,
        syohinCd: d.syohinCd,
        syohinName: d.syohinName,
        teikeisaki: d.teikeisaki,
        suryo: d.suryo,
        kamawari: d.kamawari,
        cut: d.cut,
        kansanA: d.kansanA,
        kansanB: d.kansanB,
        nouhinsuryo: d.nouhinsuryo,
        cyumonsaZentai: d.cyumonsaZentai,
        cyumonsa1Kama: d.cyumonsa1Kama,
        bikou1: d.bikou1,
        bikou2: d.bikou2,
      };
      createArray.push(obj);
    });

    // reqBody.map((d: any) => {
    //   if (d.deletedId) {
    //     deleteArray.push(d.deletedId);
    //   } else if (d.id) {
    //     const obj = {
    //       id: d.id,
    //       tokuisakiCd: d.tokuisakiCd,
    //       tokuisakiName: d.tokuisakiName,
    //       jyuchuYmd: d.jyuchuYmd,
    //       nouhinYmd: d.nouhinYmd,
    //       syohinCd: d.syohinCd,
    //       syohinName: d.syohinName,
    //       teikeisaki: d.teikeisaki,
    //       suryo: d.suryo,
    //       kamawari: d.kamawari,
    //       cut: d.cut,
    //       kansanA: d.kansanA,
    //       kansanB: d.kansanB,
    //       nouhinsuryo: d.nouhinsuryo,
    //       cyumonsaZentai: d.cyumonsaZentai,
    //       cyumonsa1Kama: d.cyumonsa1Kama,
    //       bikou1: d.bikou1,
    //       bikou2: d.bikou2,
    //     };
    //     updateArray.push(obj);
    //   } else if (!d.deletedId) {
    //     const obj = {
    //       tokuisakiCd: d.tokuisakiCd,
    //       tokuisakiName: d.tokuisakiName,
    //       jyuchuYmd: d.jyuchuYmd,
    //       nouhinYmd: d.nouhinYmd,
    //       syohinCd: d.syohinCd,
    //       syohinName: d.syohinName,
    //       teikeisaki: d.teikeisaki,
    //       suryo: d.suryo,
    //       kamawari: d.kamawari,
    //       cut: d.cut,
    //       kansanA: d.kansanA,
    //       kansanB: d.kansanB,
    //       nouhinsuryo: d.nouhinsuryo,
    //       cyumonsaZentai: d.cyumonsaZentai,
    //       cyumonsa1Kama: d.cyumonsa1Kama,
    //       bikou1: d.bikou1,
    //       bikou2: d.bikou2,
    //     };
    //     createArray.push(obj);
    //   }
    //   // if (d.id && paramTokisaki != searchTokuisaki) {
    //   //   const obj = {
    //   //     tokuisakiCd: d.tokuisakiCd,
    //   //     tokuisakiName: d.tokuisakiName,
    //   //     jyuchuYmd: d.jyuchuYmd,
    //   //     nouhinYmd: d.nouhinYmd,
    //   //     syohinCd: d.syohinCd,
    //   //     syohinName: d.syohinName,
    //   //     teikeisaki: d.teikeisaki,
    //   //     suryo: d.suryo,
    //   //     kamawari: d.kamawari,
    //   //     cut: d.cut,
    //   //     kansanA: d.kansanA,
    //   //     kansanB: d.kansanB,
    //   //     nouhinsuryo: d.nouhinsuryo,
    //   //     cyumonsaZentai: d.cyumonsaZentai,
    //   //     cyumonsa1Kama: d.cyumonsa1Kama,
    //   //     bikou1: d.bikou1,
    //   //     bikou2: d.bikou2,
    //   //   };
    //   //   createArray.push(obj);
    //   // }
    // });

    let updateResultData: any = [];
    // for (let i = 0; i < updateArray.length; i++) {
    //   const toUpdate = {
    //     ...updateArray[i],
    //     updated_at: new Date().toISOString(),
    //   };

    //   const updateResult = await SchoolLunchDataRepository.update(
    //     updateArray[i].id,
    //     toUpdate
    //   );
    //   updateResultData.push(updateResult);
    // }

    // console.log("deleteArray >> ", deleteArray);
    // console.log("updatedArray >> ", updateArray);
    // console.log("createArray >> ", createArray);

    if (!paramTokisaki || !paramJyuchymd || !reqBody) {
      return NextResponse.json({ error: "Permeter Invalid!" }, { status: 400 });
    }
    //delete all record equipment params

    const deleteResult = await SchoolLunchDataRepository.deleteMany(
      paramTokisaki,
      paramJyuchymd,
      deleteSkip,
    );
    const result = await SchoolLunchDataRepository.createMany(createArray);
    return NextResponse.json(
      {
        message: "success",
        result1: paramTokisaki,
        result2: paramJyuchymd,
        result3: deleteResult,
        result4: result,
        result5: updateResultData,
      },
      { status: 201 }
    );
  } catch (e) {
    console.log("error output", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
