-- CreateTable
CREATE TABLE `OntoKeyphrase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relationship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,
    `minScore` DECIMAL(65, 30) NOT NULL,
    `maxScore` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OntoKeyphraseRelationship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `relationshipID` INTEGER NOT NULL,
    `ontoKeyphraseIDFirst` INTEGER NOT NULL,
    `ontoKeyphraseIDSecond` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Define` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Semantic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `defID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SemanticKeyphrase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SemanticKeyphraseRelationship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `relationshipID` INTEGER NOT NULL,
    `ontoKeyphraseIDFirst` INTEGER NOT NULL,
    `ontoKeyphraseIDSecond` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
