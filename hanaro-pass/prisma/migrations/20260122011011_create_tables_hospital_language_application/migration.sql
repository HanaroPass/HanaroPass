-- CreateTable
CREATE TABLE `HospitalLanguageApplication` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `hospitalId` INTEGER UNSIGNED NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `requestLangs` JSON NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `processedAt` TIMESTAMP(0) NULL,

    INDEX `fk_LanguageApplication_hospital`(`hospitalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HospitalLanguageApplication` ADD CONSTRAINT `HospitalLanguageApplication_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
