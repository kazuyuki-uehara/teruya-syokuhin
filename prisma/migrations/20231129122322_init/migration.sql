-- CreateTable
CREATE TABLE "schoolLunchData" (
    "id" TEXT NOT NULL,
    "tokuisakiCd" TEXT NOT NULL,
    "tokuisakiName" TEXT NOT NULL,
    "jyuchuYmd" TIMESTAMP(3) NOT NULL,
    "nouhinYmd" TIMESTAMP(3) NOT NULL,
    "syohinCd" TEXT NOT NULL,
    "syohinName" TEXT NOT NULL,
    "teikeisaki" TEXT NOT NULL,
    "suryo" DOUBLE PRECISION NOT NULL,
    "kamawari" INTEGER NOT NULL,
    "cut" TEXT NOT NULL,
    "kansanA" INTEGER NOT NULL,
    "kansanB" INTEGER NOT NULL,
    "nouhinsuryo" DOUBLE PRECISION NOT NULL,
    "cyumonsaZentai" DOUBLE PRECISION NOT NULL,
    "cyumonsa1Kama" DOUBLE PRECISION NOT NULL,
    "bikou1" TEXT NOT NULL,
    "bikou2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schoolLunchData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "masterSchoolLunchDataCalculation" (
    "id" TEXT NOT NULL,
    "syohinCd" TEXT NOT NULL,
    "tani" TEXT NOT NULL,
    "keisanSettei" INTEGER NOT NULL,
    "fukuroKijyunchi" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "masterSchoolLunchDataCalculation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schoolLunchDataReal" (
    "id" TEXT NOT NULL,
    "tokuisakiCd" TEXT NOT NULL,
    "tokuisakiName" TEXT NOT NULL,
    "jyuchuYmd" TIMESTAMP(3) NOT NULL,
    "nouhinYmd" TIMESTAMP(3) NOT NULL,
    "syohinCd" TEXT NOT NULL,
    "syohinName" TEXT NOT NULL,
    "teikeisaki" TEXT NOT NULL,
    "suryo" DOUBLE PRECISION NOT NULL,
    "kamawari" INTEGER NOT NULL,
    "cut" TEXT NOT NULL,
    "kansanA" INTEGER NOT NULL,
    "kansanB" INTEGER NOT NULL,
    "nouhinsuryo" DOUBLE PRECISION NOT NULL,
    "cyumonsaZentai" DOUBLE PRECISION NOT NULL,
    "cyumonsa1Kama" DOUBLE PRECISION NOT NULL,
    "bikou1" TEXT NOT NULL,
    "bikou2" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "schoolLunchDataReal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schoolLunchData_syohinCd_key" ON "schoolLunchData"("syohinCd");

-- CreateIndex
CREATE UNIQUE INDEX "masterSchoolLunchDataCalculation_syohinCd_key" ON "masterSchoolLunchDataCalculation"("syohinCd");
