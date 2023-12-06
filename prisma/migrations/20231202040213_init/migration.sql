/*
  Warnings:

  - A unique constraint covering the columns `[bikoCd]` on the table `masterSchoolLunchBiko2` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "masterSchoolLunchBiko2_bikoCd_key" ON "masterSchoolLunchBiko2"("bikoCd");
