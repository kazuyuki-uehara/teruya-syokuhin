import { prisma } from "@/app/_utils/prismaSingleton";
import { schoolLunchData } from "@prisma/client";

export namespace SchoolLunchDataRepository {
  export async function findMany() {
    return await prisma.schoolLunchData.findMany();
  }

  // sub-total
  export async function subTotal() {
    try {
      // prisma query
      const sub_total = await prisma.schoolLunchData.groupBy({
        by: ["nouhinYmd", "syohinCd"],
        _sum: {
          suryo: true,
          kansanB : true
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
  export async function GrandTotal() {
    try {
      const result = await prisma.schoolLunchData.aggregate({
        _sum: {
          suryo: true,
          kansanB : true
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
  export async function details(date: Date) {
    try {
      const orders = await prisma.schoolLunchData.findMany({
        where: {
          nouhinYmd: new Date(date),
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

  // select CD
  // export async function selectShoHinCD(shohincd: any) {
  //   return await prisma.schoolLunchData.findUnique({
  //     where: {
  //       syohinCd: shohincd,
  //     },
  //   });
  // }

  // create
  export async function create(mslcInput: schoolLunchData) {
    console.log("mslcInput",mslcInput)
    return await prisma.schoolLunchData.create({
      data: {
        ...mslcInput,
      },
    });
  }

  // update
  export async function update(id: string, MSLCInput: schoolLunchData) {
    console.log(id, MSLCInput);
    return await prisma.schoolLunchData.update({
      where: {
        id,
      },
      data: {
        ...MSLCInput,
      },
    });
  }

   // delete
   export async function remove(id: string) {
    return await prisma.schoolLunchData.delete({
      where: {
        id: id,
      },
    });
  }

  

  
}
