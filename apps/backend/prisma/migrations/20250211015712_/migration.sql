/*
  Warnings:

  - You are about to drop the `InviteCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InviteCode" DROP CONSTRAINT "InviteCode_challenge_id_fkey";

-- DropTable
DROP TABLE "InviteCode";

-- CreateTable
CREATE TABLE "invite_codes" (
    "code" TEXT NOT NULL,
    "challenge_id" CHAR(25) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "invite_codes_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "invite_codes" ADD CONSTRAINT "invite_codes_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
