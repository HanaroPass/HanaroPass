/*
  Warnings:

  - Made the column `aiSummaryEn` on table `HospitalReview` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `HospitalReview` MODIFY `aiSummaryEn` VARCHAR(500) NOT NULL;
