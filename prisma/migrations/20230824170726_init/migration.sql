-- CreateEnum
CREATE TYPE "hackathon_role" AS ENUM ('mentor', 'judge', 'recruiter');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" STRING NOT NULL,
    "password_hash" STRING,
    "first_name" STRING NOT NULL,
    "last_name" STRING NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hackathons" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "slug" STRING NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "website" STRING,

    CONSTRAINT "hackathons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "first_name" STRING NOT NULL,
    "last_name" STRING NOT NULL,
    "title" STRING NOT NULL,
    "email" STRING NOT NULL,
    "image" STRING NOT NULL,
    "ask_about" STRING NOT NULL,
    "location" STRING,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hackathon_staff" (
    "hackathon_id" UUID NOT NULL,
    "staff_id" UUID NOT NULL,
    "roles" "hackathon_role"[],

    CONSTRAINT "hackathon_staff_pkey" PRIMARY KEY ("staff_id","hackathon_id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hackathon_id" UUID NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "prize" STRING NOT NULL,
    "image" STRING,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workshops" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hackathon_id" UUID NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING NOT NULL,
    "location" STRING,
    "url" STRING NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "workshops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "hackathon_staff_roles_idx" ON "hackathon_staff" USING GIN ("roles");

-- CreateIndex
CREATE UNIQUE INDEX "challenges_hackathon_id_key" ON "challenges"("hackathon_id");

-- CreateIndex
CREATE UNIQUE INDEX "workshops_hackathon_id_key" ON "workshops"("hackathon_id");

-- AddForeignKey
ALTER TABLE "hackathon_staff" ADD CONSTRAINT "hackathon_staff_hackathon_id_fkey" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hackathon_staff" ADD CONSTRAINT "hackathon_staff_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_hackathon_id_fkey" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workshops" ADD CONSTRAINT "workshops_hackathon_id_fkey" FOREIGN KEY ("hackathon_id") REFERENCES "hackathons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
