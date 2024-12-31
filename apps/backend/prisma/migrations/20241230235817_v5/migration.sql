/*
  Warnings:

  - You are about to drop the column `notes` on the `activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "notes",
ADD COLUMN     "note" TEXT;
