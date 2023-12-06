import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SchoolLunchDataRepository } from "@/app/_repositories/school-lunch-data/SchoolLunchData";
import { Dayjs } from "dayjs";

type SchoolLunchData = {
  id: string | null;
  tokuisakiCd: string | null;
  tokuisakiName: string | null;
  jyuchuYmd: string | Date | Dayjs | null;
  nouhinYmd: string | Date | Dayjs | null; // delivery date (previous version date)
  syohinCd: string | null;
  syohinName: string | null; // product
  teikeisaki: string | null; // schoolType
  suryo: number | null; // amount
  kamawari: number | null; // pot
  cut: string | null;
  kansanA: number | null;
  kansanB: number | null;
  nouhinsuryo: number | null;
  cyumonsaZentai: number | null;
  cyumonsa1Kama: number | null;
  bikou1: string | null; // remark
  bikou2: string | null; // remark2
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchParam = searchParams?.get("q");
  const searchParams2 = searchParams?.get("ym");
  const searchYmd = searchParams?.get("ymd");

  try {
    const subTotalResult = await SchoolLunchDataRepository.subTotal(
      searchParam,
      searchParams2,
      // jyuchuYmdSE,
      searchYmd
    );
    const finalTotal = (await SchoolLunchDataRepository.GrandTotal(
      searchParam,
      searchParams2,
      // jyuchuYmdSE,
      searchYmd
    )) as any;

    // console.log("subTotalResult >> ",subTotalResult)
    // console.log("finalTotalResult >> ",finalTotal)
    // const ordersInfo = new Array(myArrayLength);

    let ordersInfo: SchoolLunchData[] = [];

    const finalTotalObj: SchoolLunchData = {
      id: null,
      tokuisakiCd: null,
      tokuisakiName: null,
      jyuchuYmd: null,
      nouhinYmd: null,
      syohinCd: null,
      syohinName: "総合計",
      teikeisaki: null,
      suryo: finalTotal._sum.suryo,
      kamawari: null,
      cut: null,
      kansanA: null,
      kansanB: finalTotal._sum.kansanB,
      nouhinsuryo: null,
      cyumonsaZentai: null,
      cyumonsa1Kama: null,
      bikou1: null,
      bikou2: null,
    };
    // console.log("final total obj", finalTotalObj);
    // const result = await Promise.all(
    for (const eachRow of subTotalResult) {
      const parmDate = eachRow.nouhinYmd;
      const subTotalObj: SchoolLunchData = {
        id: null,
        tokuisakiCd: null,
        tokuisakiName: null,
        jyuchuYmd: null,
        nouhinYmd: null,
        syohinCd: null,
        syohinName: "合計",
        teikeisaki: null,
        suryo: eachRow._sum.suryo,
        kamawari: null,
        cut: null,
        kansanA: null,
        kansanB: eachRow._sum.kansanB,
        nouhinsuryo: null,
        cyumonsaZentai: null,
        cyumonsa1Kama: null,
        bikou1: null,
        bikou2: null,
      };
      const details = await SchoolLunchDataRepository.details(
        parmDate,
        searchParam,
        searchParams2,
        // jyuchuYmdSE,
        searchYmd
      );
      details.map((detail: SchoolLunchData) => {
        ordersInfo.push(detail);
      });
      ordersInfo.push(subTotalObj);
      // return ordersInfo;
    }
    // );
    // console.log(ordersInfo);
    ordersInfo.push(finalTotalObj);
    // console.log("ordersInfoSorted", ordersInfo);
    return NextResponse.json({
      message: "success",
      final: ordersInfo,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
