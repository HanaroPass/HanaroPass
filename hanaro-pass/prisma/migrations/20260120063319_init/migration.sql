-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(100) NOT NULL,
    `nationality` VARCHAR(100) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Passport` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `passportNumber` VARCHAR(512) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHERS') NOT NULL,
    `issueDate` DATE NOT NULL,
    `expiryDate` DATE NOT NULL,
    `userPhotoUrl` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Passport_userId_key`(`userId`),
    UNIQUE INDEX `Passport_passportNumber_key`(`passportNumber`),
    INDEX `fk_Passport_user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ARC` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `arcNumber` VARCHAR(512) NOT NULL,
    `residenceStatus` VARCHAR(50) NOT NULL,
    `issueDate` DATE NOT NULL,
    `userPhotoUrl` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `ARC_userId_key`(`userId`),
    UNIQUE INDEX `ARC_arcNumber_key`(`arcNumber`),
    INDEX `fk_ARC_user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDocument` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `docType` ENUM('PHOTO', 'COPY', 'STUDENT_ID') NOT NULL,
    `fileUrl` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_UserDocument_user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCard` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `cardType` ENUM('PREPAID_TRAVELER', 'HANA_EZ') NOT NULL,
    `cardNumber` VARCHAR(20) NOT NULL,
    `balance` DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uniq_UserCard_number`(`cardNumber`),
    INDEX `fk_UserCard_user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupons` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tag` VARCHAR(15) NULL,
    `discount` INTEGER UNSIGNED NOT NULL,
    `category` ENUM('FOOD', 'FASHION', 'BEAUTY', 'ACTIVITY', 'TRAVEL') NOT NULL,
    `couponCode` VARCHAR(50) NOT NULL,
    `brandName` VARCHAR(100) NOT NULL,
    `brandPic` VARCHAR(255) NOT NULL,
    `latitude` DECIMAL(10, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL,

    UNIQUE INDEX `uniq_Coupon_code`(`couponCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SavedPlace` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `placeName` VARCHAR(100) NOT NULL,
    `category` ENUM('CAFE', 'FOOD', 'SHOP') NOT NULL,
    `latitude` VARCHAR(100) NOT NULL,
    `longitude` VARCHAR(100) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `openHours` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(100) NOT NULL,

    INDEX `fk_SavedPlace_user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospital` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nameKo` VARCHAR(255) NOT NULL,
    `address` VARCHAR(500) NOT NULL,
    `latitude` DECIMAL(10, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `openHours` VARCHAR(100) NOT NULL,

    INDEX `idx_Hospital_location`(`latitude`, `longitude`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HospitalDept` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `hospitalId` INTEGER UNSIGNED NOT NULL,
    `deptName` VARCHAR(50) NOT NULL,

    INDEX `fk_HospitalDept_hospital`(`hospitalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HospitalLang` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `hospitalId` INTEGER UNSIGNED NOT NULL,
    `langName` VARCHAR(50) NOT NULL,

    INDEX `fk_HospitalLang_hospital`(`hospitalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HospitalReview` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `hospitalId` INTEGER UNSIGNED NOT NULL,
    `aiSummary` VARCHAR(500) NOT NULL,

    UNIQUE INDEX `uniq_HospitalReview_hospital`(`hospitalId`),
    INDEX `fk_HospitalReview_hospital`(`hospitalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Embassy` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nationality` VARCHAR(100) NOT NULL,
    `placeName` VARCHAR(100) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `openHours` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SymptomMappings` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `keyword` VARCHAR(100) NOT NULL,
    `synonyms` LONGTEXT NOT NULL,
    `deptName` VARCHAR(50) NOT NULL,
    `bodyPart` VARCHAR(50) NOT NULL,

    INDEX `idx_Symptom_keyword`(`keyword`),
    FULLTEXT INDEX `ft_Symptom_search`(`keyword`, `synonyms`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Passport` ADD CONSTRAINT `passport_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ARC` ADD CONSTRAINT `arc_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserDocument` ADD CONSTRAINT `userdocument_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserCard` ADD CONSTRAINT `usercard_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SavedPlace` ADD CONSTRAINT `savedplace_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `HospitalDept` ADD CONSTRAINT `hospitaldept_ibfk_1` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `HospitalLang` ADD CONSTRAINT `hospitallang_ibfk_1` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `HospitalReview` ADD CONSTRAINT `hospitalreview_ibfk_1` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
