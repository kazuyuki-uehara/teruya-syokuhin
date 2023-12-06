import { prisma } from "@/app/_utils/prismaSingleton";
import { masterSchoolLunchDataCalculation } from "@prisma/client";

export namespace SchoolLunchCalRepository {
  // find many
  export async function findMany() {
    return await prisma.masterSchoolLunchDataCalculation.findMany();
  }

  // create
  export async function create(input: masterSchoolLunchDataCalculation) {
    // console.log("mslcInput",input)
    return await prisma.masterSchoolLunchDataCalculation.create({
      data: {
        ...input,
      },
    });
  }

  // update
  export async function update(
    id: string,
    input: masterSchoolLunchDataCalculation
  ) {
    console.log(id, input);
    return await prisma.masterSchoolLunchDataCalculation.update({
      where: {
        id,
      },
      data: {
        ...input,
      },
    });
  }
  //   select CD
  export async function selectShoHinCD(shohincd: string) {
    return await prisma.masterSchoolLunchDataCalculation.findUnique({
      where: {
        syohinCd: shohincd,
      },
    });
  }

 // get by database table id
 export async function selectById(id: string) {
    return await prisma.masterSchoolLunchDataCalculation.findUnique({
      where: {
        id: id,
      },
    });
  }

  // namespace end
}


