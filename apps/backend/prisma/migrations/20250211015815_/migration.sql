/*
  Warnings:

  - The primary key for the `invite_codes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `code` on the `invite_codes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(8)`.

*/
-- AlterTable
ALTER TABLE "invite_codes" DROP CONSTRAINT "invite_codes_pkey",
ALTER COLUMN "code" SET DATA TYPE CHAR(8),
ADD CONSTRAINT "invite_codes_pkey" PRIMARY KEY ("code");
