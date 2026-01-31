/*
  Warnings:

  - You are about to drop the column `userId` on the `HospitalLanguageApplication` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `HospitalLanguageApplication` DROP FOREIGN KEY `HospitalLanguageApplication_userId_fkey`;

-- DropIndex
DROP INDEX `HospitalLanguageApplication_userId_fkey` ON `HospitalLanguageApplication`;

-- AlterTable
ALTER TABLE `HospitalLanguageApplication` DROP COLUMN `userId`,
    ADD COLUMN `applicantEmail` VARCHAR(255) NOT NULL;
