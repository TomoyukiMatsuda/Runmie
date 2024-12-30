/*
  Warnings:

  - You are about to drop the column `process_id` on the `challenges` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[challenge_id]` on the table `challenge_processes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `challenge_id` to the `challenge_processes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "challenges" DROP CONSTRAINT "challenges_process_id_fkey";

-- DropIndex
DROP INDEX "challenge_members_challenge_id_idx";

-- DropIndex
DROP INDEX "challenges_process_id_idx";

-- DropIndex
DROP INDEX "challenges_process_id_key";

-- AlterTable
ALTER TABLE "challenge_processes" ADD COLUMN     "challenge_id" CHAR(25) NOT NULL;

-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "process_id";

-- CreateIndex
CREATE UNIQUE INDEX "challenge_processes_challenge_id_key" ON "challenge_processes"("challenge_id");

-- AddForeignKey
ALTER TABLE "challenge_processes" ADD CONSTRAINT "challenge_processes_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
