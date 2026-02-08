-- CreateTable
CREATE TABLE `BarcodeToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tokenHash` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `cardId` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `usedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `BarcodeToken_tokenHash_key`(`tokenHash`),
    INDEX `BarcodeToken_userId_idx`(`userId`),
    INDEX `BarcodeToken_cardId_idx`(`cardId`),
    INDEX `BarcodeToken_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
