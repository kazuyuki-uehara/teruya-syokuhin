import { prisma } from "@/app/_utils/prismaSingleton";
import { masterSchoolLunchBiko2 } from "@prisma/client";

export namespace Biko2MasterRepository {
  export async function findMany() {
    return await prisma.masterSchoolLunchBiko2.findMany();
  }

  export async function createMany(input: masterSchoolLunchBiko2) {
    return await prisma.masterSchoolLunchBiko2.createMany({
      data: input,
    });
  }

  export async function deleteMany(deleteSkip:boolean) {
    if(deleteSkip){
        return true
    }else{
        return await prisma.masterSchoolLunchBiko2.deleteMany({});
    }
  }
}
