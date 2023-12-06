import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const schoolLunchCal = await prisma.masterSchoolLunchDataCalculation.upsert({
    where: { syohinCd: "0000032" },
    update: {},
    create: {
      syohinCd: "0000032",
      tani: "個",
      keisanSettei: 2,
      fukuroKijyunchi: 5,
    },
  });

  const schoolLunchCal2 = await prisma.masterSchoolLunchDataCalculation.upsert({
    where: { syohinCd: "0000031" },
    update: {},
    create: {
      syohinCd: "0000031",
      tani: "kg",
      keisanSettei: 3,
      fukuroKijyunchi: 9.6,
    },
  });

  const schoolLunchCal3 = await prisma.masterSchoolLunchDataCalculation.upsert({
    where: { syohinCd: "0000039" },
    update: {},
    create: {
      syohinCd: "0000039",
      tani: "kg",
      keisanSettei: 4,
      fukuroKijyunchi: 5,
    },
  });

  const schoolLunchCal4 = await prisma.masterSchoolLunchDataCalculation.upsert({
    where: { syohinCd: "0000033" },
    update: {},
    create: {
      syohinCd: "0000033",
      tani: "個",
      keisanSettei: 3,
      fukuroKijyunchi: 5,
    },
  });

  const schoolLunchCal5 = await prisma.masterSchoolLunchDataCalculation.upsert({
    where: { syohinCd: "0000034" },
    update: {},
    create: {
      syohinCd: "0000034",
      tani: "個",
      keisanSettei: 2,
      fukuroKijyunchi: 5,
    },
  });

  const schoolLunchCal6 = await prisma.masterSchoolLunchDataCalculation.upsert({
    where: { syohinCd: "0000060" },
    update: {},
    create: {
      syohinCd: "0000060",
      tani: "kg",
      keisanSettei: 2,
      fukuroKijyunchi: 5,
    },
  });

  // const biko2master = await prisma.masterSchoolLunchBiko2.upsert({
  //   where: { bikoCd: 1 },
  //   update: {},
  //   create: {
  //     syohinCd: "0000060",
  //     tokuisakiCd: "kg",
  //     mongon: "sjkf",
  //   },
  // })





  //   const schoolLunchData = await prisma.schoolLunchDataReal.upsert({
  //     where: { tokuisakiCd: "000001" },
  //     update: {},
  //     create: {
  //       tokuisakiCd: "000001",
  //       tokuisakiName: "(株)丸大南風原店センター",
  //       jyuchuYmd: new Date("2023-10-23 09:00:00"),
  //       nouhinYmd: new Date("2023-10-23 09:00:00"),
  //       syohinCd: "00000050",
  //       syohinName: "厚揚げ",
  //       teikeisaki: "小",
  //       suryo: 36,
  //       kamawari: 3,
  //       cut: "simple",
  //       kansanA: 4,
  //       kansanB: 9,
  //       nouhinsuryo: 0,
  //       cyumonsaZentai: 0,
  //       cyumonsa1Kama: 0,
  //       bikou1: "simple remark",
  //       bikou2: "data",
  //     },
  //   });

  //   const schoolLunchData2 = await prisma.schoolLunchDataReal.upsert({
  //     where: { tokuisakiCd: "000002" },
  //     update: {},
  //     create: {
  //       tokuisakiCd: "000002",
  //       tokuisakiName: "(株)丸大南風原店センター",
  //       jyuchuYmd: new Date("2023-10-23 09:00:00"),
  //       nouhinYmd: new Date("2023-10-23 09:00:00"),
  //       syohinCd: "00000050",
  //       syohinName: "厚揚げ",
  //       teikeisaki: "小",
  //       suryo: 36,
  //       kamawari: 3,
  //       cut: "simple",
  //       kansanA: 4,
  //       kansanB: 9,
  //       nouhinsuryo: 0,
  //       cyumonsaZentai: 0,
  //       cyumonsa1Kama: 0,
  //       bikou1: "simple remark",
  //       bikou2: "data",
  //     },
  //   });

  //   const schoolLunchData3 = await prisma.schoolLunchDataReal.upsert({
  //     where: { tokuisakiCd: "000004" },
  //     update: {},
  //     create: {
  //       tokuisakiCd: "000004",
  //       tokuisakiName: "(株)丸大南風原店センター",
  //       jyuchuYmd: new Date("2023-10-23 09:00:00"),
  //       nouhinYmd: new Date("2023-10-23 09:00:00"),
  //       syohinCd: "00000050",
  //       syohinName: "厚揚げ",
  //       teikeisaki: "小",
  //       suryo: 36,
  //       kamawari: 3,
  //       cut: "simple",
  //       kansanA: 4,
  //       kansanB: 9,
  //       nouhinsuryo: 0,
  //       cyumonsaZentai: 0,
  //       cyumonsa1Kama: 0,
  //       bikou1: "simple remark",
  //       bikou2: "data",
  //     },
  //   });

  //   const schoolLunchData4 = await prisma.schoolLunchDataReal.upsert({
  //     where: { tokuisakiCd: "000004" },
  //     update: {},
  //     create: {
  //       tokuisakiCd: "000004",
  //       tokuisakiName: "hello",
  //       jyuchuYmd: new Date("2023-10-23 09:00:00"),
  //       nouhinYmd: new Date("2023-10-23 09:00:00"),
  //       syohinCd: "00000050",
  //       syohinName: "厚揚げ",
  //       teikeisaki: "小",
  //       suryo: 36,
  //       kamawari: 3,
  //       cut: "simple",
  //       kansanA: 4,
  //       kansanB: 9,
  //       nouhinsuryo: 0,
  //       cyumonsaZentai: 0,
  //       cyumonsa1Kama: 0,
  //       bikou1: "simple remark",
  //       bikou2: "data",
  //     },
  //   });

  // //   const schoolLunchData2 = await prisma.schoolLunchData.upsert({
  // //     where: { syohinCd: "00000090", },
  // //     update: {},
  // //     create: {
  // //       tokuisakiCd: "0000002",
  // //       tokuisakiName: "(株)丸大南風原店センター",
  // //       jyuchuYmd: new Date("2023-10-24 09:00:00"),
  // //       nouhinYmd: new Date("2023-10-24 09:00:00"),
  // //       syohinCd: "00000090",
  // //       syohinName: "ゆし豆腐",
  // //       teikeisaki: "小",
  // //       suryo: 36,
  // //       kamawari: 3,
  // //       cut: "simple",
  // //       kansanA: 4,
  // //       kansanB: 9,
  // //       nouhinsuryo: 0,
  // //       cyumonsaZentai: 0,
  // //       cyumonsa1Kama: 0,
  // //       bikou1: "simple remark2",
  // //       bikou2: "data 2",
  // //     },
  // //   });

  // //   const schoolLunchData3 = await prisma.schoolLunchData.upsert({
  // //     where: { syohinCd: "00000069" },
  // //     update: {},
  // //     create: {
  // //       tokuisakiCd: "0000003",
  // //       tokuisakiName: "(株)丸大南風原店センター",
  // //       jyuchuYmd: new Date("2023-09-07 09:00:00"),
  // //       nouhinYmd: new Date("2023-09-07 09:00:00"),
  // //       syohinCd: "00000069",
  // //       syohinName: "厚揚げ",
  // //       teikeisaki: "中",
  // //       suryo: 55,
  // //       kamawari: 6,
  // //       cut: "simple",
  // //       kansanA: 6,
  // //       kansanB: 0,
  // //       nouhinsuryo: 84,
  // //       cyumonsaZentai: 29,
  // //       cyumonsa1Kama: 4.8,
  // //       bikou1: "simple remark2",
  // //       bikou2: "data 2",
  // //     },
  // //   });

  // //   const schoolLunchData4 = await prisma.schoolLunchData.upsert({
  // //     where: { syohinCd: "00000072" },
  // //     update: {},
  // //     create: {
  // //       tokuisakiCd: "0000004",
  // //       tokuisakiName: "(株)丸大南風原店センター",
  // //       jyuchuYmd: new Date("2023-09-08 09:00:00"),
  // //       nouhinYmd: new Date("2023-09-08 09:00:00"),
  // //       syohinCd: "00000072",
  // //       syohinName: "沖縄豆腐",
  // //       teikeisaki: "小",
  // //       suryo: 46,
  // //       kamawari: 3,
  // //       cut: "simple",
  // //       kansanA: 3,
  // //       kansanB: 3,
  // //       nouhinsuryo: 63,
  // //       cyumonsaZentai: 17,
  // //       cyumonsa1Kama: 5.7,
  // //       bikou1: "simple remark2",
  // //       bikou2: "data 2",
  // //     },
  // //   });

  // //   const schoolLunchData5 = await prisma.schoolLunchData.upsert({
  // //     where: { syohinCd: "00000064" },
  // //     update: {},
  // //     create: {
  // //       tokuisakiCd: "0000005",
  // //       tokuisakiName: "(株)丸大南風原店センター",
  // //       jyuchuYmd: new Date("2023-09-14 09:00:00"),
  // //       nouhinYmd: new Date("2023-09-14 09:00:00"),
  // //       syohinCd: "00000064",
  // //       syohinName: "厚揚げ",
  // //       teikeisaki: "小",
  // //       suryo: 67,
  // //       kamawari: 5,
  // //       cut: "simple",
  // //       kansanA: 5,
  // //       kansanB: 0,
  // //       nouhinsuryo: 70,
  // //       cyumonsaZentai: 3,
  // //       cyumonsa1Kama: 0.6,
  // //       bikou1: "simple remark2",
  // //       bikou2: "data 2",
  // //     },
  // //   });

  // //   const schoolLunchData6 = await prisma.schoolLunchData.upsert({
  // //     where: { syohinCd: "00000062" },
  // //     update: {},
  // //     create: {
  // //       tokuisakiCd: "0000006",
  // //       tokuisakiName: "(株)丸大南風原店センター",
  // //       jyuchuYmd: new Date("2023-09-14 09:00:00"),
  // //       nouhinYmd: new Date("2023-09-14 09:00:00"),
  // //       syohinCd: "00000062",
  // //       syohinName: "厚揚げ",
  // //       teikeisaki: "小",
  // //       suryo: 53,
  // //       kamawari: 3,
  // //       cut: "simple",
  // //       kansanA: 3,
  // //       kansanB: 3,
  // //       nouhinsuryo: 63,
  // //       cyumonsaZentai: 10,
  // //       cyumonsa1Kama: 3.3,
  // //       bikou1: "simple remark2",
  // //       bikou2: "data 2",
  // //     },
  // //   });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
