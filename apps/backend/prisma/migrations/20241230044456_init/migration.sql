-- CreateEnum
CREATE TYPE "challenge_statuses" AS ENUM ('draft', 'active', 'completed');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('admin', 'member');

-- CreateTable
CREATE TABLE "users" (
    "id" CHAR(25) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" CHAR(25) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "target_date" DATE NOT NULL,
    "status" "challenge_statuses" NOT NULL DEFAULT 'active',
    "process_id" CHAR(25) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_processes" (
    "id" CHAR(25) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "challenge_processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_members" (
    "id" CHAR(25) NOT NULL,
    "user_id" CHAR(25) NOT NULL,
    "challenge_id" CHAR(25) NOT NULL,
    "role" "roles" NOT NULL DEFAULT 'member',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "challenge_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" CHAR(25) NOT NULL,
    "user_id" CHAR(25) NOT NULL,
    "challenge_id" CHAR(25) NOT NULL,
    "distance" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "notes" TEXT,
    "image_url" VARCHAR(255),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" CHAR(25) NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" CHAR(25) NOT NULL,
    "process_id" CHAR(25) NOT NULL,
    "activity_id" CHAR(25),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "challenges_process_id_idx" ON "challenges"("process_id");

-- CreateIndex
CREATE UNIQUE INDEX "challenges_process_id_key" ON "challenges"("process_id");

-- CreateIndex
CREATE INDEX "challenge_members_challenge_id_idx" ON "challenge_members"("challenge_id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_members_user_id_challenge_id_key" ON "challenge_members"("user_id", "challenge_id");

-- CreateIndex
CREATE INDEX "activities_user_id_idx" ON "activities"("user_id");

-- CreateIndex
CREATE INDEX "activities_challenge_id_idx" ON "activities"("challenge_id");

-- CreateIndex
CREATE INDEX "messages_user_id_idx" ON "messages"("user_id");

-- CreateIndex
CREATE INDEX "messages_process_id_idx" ON "messages"("process_id");

-- CreateIndex
CREATE INDEX "messages_activity_id_idx" ON "messages"("activity_id");

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "challenge_processes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_members" ADD CONSTRAINT "challenge_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_members" ADD CONSTRAINT "challenge_members_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "challenge_processes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
