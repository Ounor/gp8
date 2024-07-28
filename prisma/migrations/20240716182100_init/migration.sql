/*
  Warnings:

  - You are about to drop the `patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "patient";

-- DropTable
DROP TABLE "visit";

-- CreateTable
CREATE TABLE "visits" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "nextVisit" TIMESTAMP(3) NOT NULL,
    "pregnancyPeriod" TEXT NOT NULL,
    "bodyWeight" TEXT NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "middleName" TEXT,
    "secondName" TEXT,
    "phone" TEXT,
    "notes" TEXT NOT NULL,
    "birthDay" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_firstName_key" ON "patients"("firstName");

-- CreateIndex
CREATE UNIQUE INDEX "patients_middleName_key" ON "patients"("middleName");

-- CreateIndex
CREATE UNIQUE INDEX "patients_secondName_key" ON "patients"("secondName");

-- CreateIndex
CREATE UNIQUE INDEX "patients_phone_key" ON "patients"("phone");
