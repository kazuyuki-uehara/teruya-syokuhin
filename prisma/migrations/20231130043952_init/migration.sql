-- CreateTable
CREATE TABLE "masterSchoolLunchBiko2" (
    "id" TEXT NOT NULL,
    "bikoCd" TEXT NOT NULL,
    "tokuisakiCd" TEXT NOT NULL,
    "shohinCd" TEXT NOT NULL,
    "mongon" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "masterSchoolLunchBiko2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "masterSchoolLunchBiko2_bikoCd_key" ON "masterSchoolLunchBiko2"("bikoCd");
