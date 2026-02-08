/*
  Warnings:

  - The primary key for the `BarcodeToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `BarcodeToken` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `tokenHash` on the `BarcodeToken` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(64)`.
  - You are about to alter the column `userId` on the `BarcodeToken` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `cardId` on the `BarcodeToken` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `BarcodeToken` DROP PRIMARY KEY,
    MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    MODIFY `tokenHash` CHAR(64) NOT NULL,
    MODIFY `userId` INTEGER UNSIGNED NOT NULL,
    MODIFY `cardId` INTEGER UNSIGNED NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `BarcodeToken` ADD CONSTRAINT `BarcodeToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BarcodeToken` ADD CONSTRAINT `BarcodeToken_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `UserCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
