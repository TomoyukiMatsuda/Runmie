/*
  Warnings:

  - A unique constraint covering the columns `[supabaseId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supabaseId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "supabaseId" CHAR(28) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_supabaseId_key" ON "users"("supabaseId");
