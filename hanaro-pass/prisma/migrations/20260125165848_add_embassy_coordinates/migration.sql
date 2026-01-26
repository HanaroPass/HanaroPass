/*
  Warnings:

  - Added the required column `latitude` to the `Embassy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Embassy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Embassy` ADD COLUMN `latitude` VARCHAR(50) NOT NULL,
    ADD COLUMN `longitude` VARCHAR(50) NOT NULL;
