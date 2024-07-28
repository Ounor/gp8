-- DropIndex
DROP INDEX "patients_firstName_key";

-- DropIndex
DROP INDEX "patients_middleName_key";

-- DropIndex
DROP INDEX "patients_phone_key";

-- DropIndex
DROP INDEX "patients_secondName_key";

-- AlterTable
ALTER TABLE "patients" ALTER COLUMN "notes" DROP NOT NULL;
