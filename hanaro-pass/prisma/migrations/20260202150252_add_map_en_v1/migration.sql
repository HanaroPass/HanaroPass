/*
  Warnings:

  - You are about to drop the column `address` on the `Embassy` table. All the data in the column will be lost.
  - You are about to drop the column `placeName` on the `Embassy` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `SavedPlace` table. All the data in the column will be lost.
  - You are about to drop the column `placeName` on the `SavedPlace` table. All the data in the column will be lost.
  - Added the required column `addressEn` to the `Embassy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressKo` to the `Embassy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `Embassy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameKo` to the `Embassy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressEn` to the `SavedPlace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressKo` to the `SavedPlace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `SavedPlace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameKo` to the `SavedPlace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Embassy` DROP COLUMN `address`,
    DROP COLUMN `placeName`,
    ADD COLUMN `addressEn` VARCHAR(100) NOT NULL,
    ADD COLUMN `addressKo` VARCHAR(100) NOT NULL,
    ADD COLUMN `nameEn` VARCHAR(100) NOT NULL,
    ADD COLUMN `nameKo` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `SavedPlace` DROP COLUMN `address`,
    DROP COLUMN `placeName`,
    ADD COLUMN `addressEn` VARCHAR(100) NOT NULL,
    ADD COLUMN `addressKo` VARCHAR(100) NOT NULL,
    ADD COLUMN `nameEn` VARCHAR(100) NOT NULL,
    ADD COLUMN `nameKo` VARCHAR(100) NOT NULL;
