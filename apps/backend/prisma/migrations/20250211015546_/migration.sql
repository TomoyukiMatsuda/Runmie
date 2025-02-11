-- CreateTable
CREATE TABLE "InviteCode" (
    "code" TEXT NOT NULL,
    "challenge_id" CHAR(25) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "InviteCode_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "InviteCode" ADD CONSTRAINT "InviteCode_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
