/*
  Warnings:

  - You are about to drop the column `shohinCd` on the `masterSchoolLunchBiko2` table. All the data in the column will be lost.
  - The `bikoCd` column on the `masterSchoolLunchBiko2` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `syohinCd` to the `masterSchoolLunchBiko2` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "masterSchoolLunchBiko2_bikoCd_key";

-- AlterTable
ALTER TABLE "masterSchoolLunchBiko2" DROP COLUMN "shohinCd",
ADD COLUMN     "syohinCd" TEXT NOT NULL,
DROP COLUMN "bikoCd",
ADD COLUMN     "bikoCd" SERIAL NOT NULL;
