/*
  Warnings:

  - Added the required column `patientId` to the `visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visit" ADD COLUMN     "patientId" TEXT NOT NULL;
