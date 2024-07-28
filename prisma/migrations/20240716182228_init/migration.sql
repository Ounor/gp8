/*
  Warnings:

  - You are about to drop the column `nextVisit` on the `visits` table. All the data in the column will be lost.
  - Added the required column `nextVisitDate` to the `visits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visits" DROP COLUMN "nextVisit",
ADD COLUMN     "nextVisitDate" TIMESTAMP(3) NOT NULL;
