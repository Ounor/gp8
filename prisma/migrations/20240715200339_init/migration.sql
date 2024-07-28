-- CreateTable
CREATE TABLE "visit" (
    "id" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "nextVisit" TIMESTAMP(3) NOT NULL,
    "pregnancyPeriod" TEXT NOT NULL,
    "bodyWeight" TEXT NOT NULL,

    CONSTRAINT "visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "middleName" TEXT,
    "secondName" TEXT,
    "phone" TEXT,
    "notes" TEXT NOT NULL,
    "birthDay" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_firstName_key" ON "patient"("firstName");

-- CreateIndex
CREATE UNIQUE INDEX "patient_middleName_key" ON "patient"("middleName");

-- CreateIndex
CREATE UNIQUE INDEX "patient_secondName_key" ON "patient"("secondName");

-- CreateIndex
CREATE UNIQUE INDEX "patient_phone_key" ON "patient"("phone");
