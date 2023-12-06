import { prisma } from "@/app/_utils/prismaSingleton";
import { schoolLunchDataReal } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";

export namespace SchoolLunchDataRepository {
  // all data
  export async function findMany(
    searchParam: string | null,
    searchYm: string | null | any,
    searchYmd: string | null | any
  ) {
    //startdate and enddate for searchYm
    let startdate;
    let enddate;
    if (searchYm == "Invalid Date") {
      startdate = null;
      enddate = null;
    } else {
      if (!startdate || !enddate) {
        const [year, month] = searchYm.split("-").map(Number);
        const startDate = new Date();
        startDate.setFullYear(year, month - 1, 1);
        startdate = dayjs(startDate).format("YYYY-MM-DD");

        const endDate = new Date(startdate);
        endDate.setMonth(endDate.getMonth() + 1, 0);
        // enddate = dayjs(enddate).format("YYYY-MM-DD")
        enddate = endDate;
      }
    }
    return await prisma.schoolLunchDataReal.findMany({
      where: {
        AND: [
          {
            tokuisakiCd: {
              contains: searchParam || undefined, // Use 'keyword' if it's not null, otherwise, it will be undefined
            },
          },
          startdate && enddate
            ? {
                jyuchuYmd: {
                  gte: new Date(startdate),
                  lte: new Date(enddate),
                },
              }
            : {},
          searchYmd !== "Invalid Date"
            ? {
                nouhinYmd: {
                  equals: new Date(searchYmd) || undefined,
                },
              }
            : {},
        ],
      },
    });
  }

  // sub-total
  export async function subTotal(
    searchParam: string | null,
    searchYm: string | null | any,
    searchYmd: string | null | any
  ) {
    let startdate;
    let enddate;
    if (searchYm == "Invalid Date") {
      startdate = null;
      enddate = null;
    } else {
      if (!startdate || !enddate) {
        const [year, month] = searchYm.split("-").map(Number);
        const startDate = new Date();
        startDate.setFullYear(year, month - 1, 1);
        startdate = dayjs(startDate).format("YYYY-MM-DD");

        const endDate = new Date(startdate);
        endDate.setMonth(endDate.getMonth() + 1, 0);
        // enddate = dayjs(enddate).format("YYYY-MM-DD")
        enddate = endDate;
      }
    }
    try {
      // prisma query
      const sub_total = await prisma.schoolLunchDataReal.groupBy({
        where: {
          AND: [
            {
              tokuisakiCd: {
                contains: searchParam || undefined, // Use 'keyword' if it's not null, otherwise, it will be undefined
              },
            },
            startdate && enddate
              ? {
                  jyuchuYmd: {
                    gte: new Date(startdate),
                    lte: new Date(enddate),
                  },
                }
              : {},
            searchYmd !== "Invalid Date"
              ? {
                  nouhinYmd: {
                    equals: new Date(searchYmd) || undefined,
                  },
                }
              : {},
          ],
        },
        by: ["nouhinYmd", "syohinCd"],
        _sum: {
          suryo: true,
          kansanB: true,
        },
        orderBy: [
          {
            nouhinYmd: "asc",
          },
          {
            syohinCd: "asc",
          },
        ],
      });
      return sub_total;
      // console.log(sub_total)
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  // grand-total
  export async function GrandTotal(
    searchParam: string | null,
    searchYm: string | null | any,
    searchYmd: string | null | any
  ) {
    let startdate;
    let enddate;
    if (searchYm == "Invalid Date") {
      startdate = null;
      enddate = null;
    } else {
      if (!startdate || !enddate) {
        const [year, month] = searchYm.split("-").map(Number);
        const startDate = new Date();
        startDate.setFullYear(year, month - 1, 1);
        startdate = dayjs(startDate).format("YYYY-MM-DD");

        const endDate = new Date(startdate);
        endDate.setMonth(endDate.getMonth() + 1, 0);
        // enddate = dayjs(enddate).format("YYYY-MM-DD")
        enddate = endDate;
      }
    }
    try {
      const result = await prisma.schoolLunchDataReal.aggregate({
        where: {
          AND: [
            {
              tokuisakiCd: {
                contains: searchParam || undefined, // Use 'keyword' if it's not null, otherwise, it will be undefined
              },
            },
            startdate && enddate
              ? {
                  jyuchuYmd: {
                    gte: new Date(startdate),
                    lte: new Date(enddate),
                  },
                }
              : {},
            searchYmd !== "Invalid Date"
              ? {
                  nouhinYmd: {
                    equals: new Date(searchYmd) || undefined,
                  },
                }
              : {},
          ],
        },
        _sum: {
          suryo: true,
          kansanB: true,
        },
      });
      // const totalQuantity = result._sum.qty;
      // console.log("Total Quantity:", totalQuantity);
      // return totalQuantity;
      return result;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await prisma.$disconnect();
    }
  }

  // detail
  export async function details(
    date: Date,
    searchParam: string | null,
    searchYm: string | null | any,
    searchYmd: string | null | any
  ) {
    let startdate;
    let enddate;
    if (searchYm == "Invalid Date") {
      startdate = null;
      enddate = null;
    } else {
      if (!startdate || !enddate) {
        const [year, month] = searchYm.split("-").map(Number);
        const startDate = new Date();
        startDate.setFullYear(year, month - 1, 1);
        startdate = dayjs(startDate).format("YYYY-MM-DD");

        const endDate = new Date(startdate);
        endDate.setMonth(endDate.getMonth() + 1, 0);
        // enddate = dayjs(enddate).format("YYYY-MM-DD")
        enddate = endDate;
      }
    }
    try {
      const orders = await prisma.schoolLunchDataReal.findMany({
        // where: {
        //   nouhinYmd: new Date(date),
        // },
        where: {
          AND: [
            {
              nouhinYmd: new Date(date),
            },
            {
              tokuisakiCd: {
                contains: searchParam || undefined, // Use 'keyword' if it's not null, otherwise, it will be undefined
              },
            },
            startdate && enddate
              ? {
                  jyuchuYmd: {
                    gte: new Date(startdate),
                    lte: new Date(enddate),
                  },
                }
              : {},
            searchYmd !== "Invalid Date"
              ? {
                  nouhinYmd: {
                    equals: new Date(searchYmd) || undefined,
                  },
                }
              : {},
          ],
        },
        select: {
          id: true,
          tokuisakiCd: true,
          tokuisakiName: true,
          jyuchuYmd: true,
          nouhinYmd: true,
          syohinCd: true,
          syohinName: true,
          teikeisaki: true,
          suryo: true,
          kamawari: true,
          cut: true,
          kansanA: true,
          kansanB: true,
          nouhinsuryo: true,
          cyumonsaZentai: true,
          cyumonsa1Kama: true,
          bikou1: true,
          bikou2: true,
        },
        orderBy: [
          {
            nouhinYmd: "asc",
          },
          {
            syohinCd: "asc",
          },
        ],
      });
      // console.log("Orders for *******:", orders.length);
      return orders;
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  // create many --->
  export async function createMany(input: schoolLunchDataReal) {
    // console.log("Input",input)
    return await prisma.schoolLunchDataReal.createMany({
      data: input,
    });
  }

  // delete many --->
  export async function deleteMany(paramTokisaki: any, paramJyuchymd: any,deleteSkip:boolean) {
    console.log("deleted date prisma >> ",new Date(paramJyuchymd))
    console.log("deleted tokuisaki prisma >> ",paramTokisaki)
    if(deleteSkip){
      return true 
    }else{
      return await prisma.schoolLunchDataReal.deleteMany({
        where: {
          AND:[
            {
              tokuisakiCd: { contains : paramTokisaki },
            },
            {
              jyuchuYmd: {equals : new Date(paramJyuchymd)},
            }
          ]
          // tokuisakiCd: {contains : paramTokisaki},
          // jyuchuYmd: new Date(paramJyuchymd),
        },
      });
    }
    
  }
  // // delete many --->
  // export async function deleteMany(deletedId: any) {
  //   // console.log("Input",input)
  //   return await prisma.schoolLunchDataReal.deleteMany({
  //     where: {
  //       id: {
  //         in: deletedId, // 削除対象のIDが含まれる配列
  //       },
  //     },
  //   });
  // }

  //     // update --->
  // export async function update(id: string, input: schoolLunchDataReal) {
  //   console.log(id, input);
  //   return await prisma.schoolLunchDataReal.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       ...input,
  //     },
  //   });
  // }
  // update one
  export async function update(id: string, input: schoolLunchDataReal) {
    console.log(id, input);
    return await prisma.schoolLunchDataReal.update({
      where: {
        id,
      },
      data: {
        ...input,
      },
    });
  }

  // select CD
  export async function selectTokuisakiCd(tokuisakiCd: string) {
    return await prisma.schoolLunchDataReal.findMany({
      where: {
        tokuisakiCd: tokuisakiCd,
      },
    });
  }
}
