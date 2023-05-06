/*
  Warnings:

  - You are about to drop the column `ontoKeyphraseIDFirst` on the `semantickeyphraserelationship` table. All the data in the column will be lost.
  - You are about to drop the column `ontoKeyphraseIDSecond` on the `semantickeyphraserelationship` table. All the data in the column will be lost.
  - Added the required column `semanticID` to the `SemanticKeyphrase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semanticKeyphraseIDFirst` to the `SemanticKeyphraseRelationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semanticKeyphraseIDSecond` to the `SemanticKeyphraseRelationship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `semantickeyphrase` ADD COLUMN `semanticID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `semantickeyphraserelationship` DROP COLUMN `ontoKeyphraseIDFirst`,
    DROP COLUMN `ontoKeyphraseIDSecond`,
    ADD COLUMN `semanticKeyphraseIDFirst` INTEGER NOT NULL,
    ADD COLUMN `semanticKeyphraseIDSecond` INTEGER NOT NULL;
