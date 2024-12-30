/*
  Warnings:

  - The primary key for the `challenge_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `challenge_members` table. All the data in the column will be lost.
  - You are about to drop the column `process_id` on the `challenge_process_messages` table. All the data in the column will be lost.
  - The primary key for the `challenge_processes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `challenge_processes` table. All the data in the column will be lost.
  - Added the required column `challenge_id` to the `challenge_process_messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_challenge_id_fkey";

-- DropForeignKey
ALTER TABLE "challenge_process_messages" DROP CONSTRAINT "challenge_process_messages_process_id_fkey";

-- DropIndex
DROP INDEX "challenge_members_user_id_challenge_id_key";

-- DropIndex
DROP INDEX "challenge_process_messages_process_id_idx";

-- AlterTable
ALTER TABLE "challenge_members" DROP CONSTRAINT "challenge_members_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "challenge_members_pkey" PRIMARY KEY ("user_id", "challenge_id");

-- AlterTable
ALTER TABLE "challenge_process_messages" DROP COLUMN "process_id",
ADD COLUMN     "challenge_id" CHAR(25) NOT NULL;

-- AlterTable
ALTER TABLE "challenge_processes" DROP CONSTRAINT "challenge_processes_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "challenge_processes_pkey" PRIMARY KEY ("challenge_id");

-- CreateIndex
CREATE INDEX "challenge_process_messages_challenge_id_idx" ON "challenge_process_messages"("challenge_id");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_challenge_id_fkey" FOREIGN KEY ("user_id", "challenge_id") REFERENCES "challenge_members"("user_id", "challenge_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenge_processes"("challenge_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_process_messages" ADD CONSTRAINT "challenge_process_messages_user_id_challenge_id_fkey" FOREIGN KEY ("user_id", "challenge_id") REFERENCES "challenge_members"("user_id", "challenge_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_process_messages" ADD CONSTRAINT "challenge_process_messages_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenge_processes"("challenge_id") ON DELETE RESTRICT ON UPDATE CASCADE;
