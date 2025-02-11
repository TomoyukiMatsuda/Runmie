/*
  Warnings:

  - You are about to drop the `invite_codes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "invite_codes" DROP CONSTRAINT "invite_codes_challenge_id_fkey";

-- DropTable
DROP TABLE "invite_codes";

-- CreateTable
CREATE TABLE "challenge_invite_codes" (
    "code" CHAR(8) NOT NULL,
    "challenge_id" CHAR(25) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "challenge_invite_codes_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "challenge_invite_codes" ADD CONSTRAINT "challenge_invite_codes_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
