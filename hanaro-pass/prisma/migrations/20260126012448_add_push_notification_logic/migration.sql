/*
  Warnings:

  - Added the required column `userId` to the `HospitalLanguageApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `HospitalLanguageApplication` ADD COLUMN `userId` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `pushSubscription` JSON NULL;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `link` VARCHAR(500) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HospitalLanguageApplication` ADD CONSTRAINT `HospitalLanguageApplication_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
