/*
  Warnings:

  - You are about to drop the `messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_process_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_user_id_fkey";

-- DropTable
DROP TABLE "messages";

-- CreateTable
CREATE TABLE "challenge_process_messages" (
    "id" CHAR(25) NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" CHAR(25) NOT NULL,
    "process_id" CHAR(25) NOT NULL,
    "activity_id" CHAR(25),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "challenge_process_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "challenge_process_messages_user_id_idx" ON "challenge_process_messages"("user_id");

-- CreateIndex
CREATE INDEX "challenge_process_messages_process_id_idx" ON "challenge_process_messages"("process_id");

-- CreateIndex
CREATE INDEX "challenge_process_messages_activity_id_idx" ON "challenge_process_messages"("activity_id");

-- AddForeignKey
ALTER TABLE "challenge_process_messages" ADD CONSTRAINT "challenge_process_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_process_messages" ADD CONSTRAINT "challenge_process_messages_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "challenge_processes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_process_messages" ADD CONSTRAINT "challenge_process_messages_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
