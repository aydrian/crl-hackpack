/*
  Warnings:

  - Added the required column `referral_id` to the `hackathons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `utm_source` to the `hackathons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hackathon_staff" ADD COLUMN     "alum_year" STRING;

-- AlterTable
ALTER TABLE "hackathons" ADD COLUMN     "referral_id" STRING NOT NULL;
ALTER TABLE "hackathons" ADD COLUMN     "utm_source" STRING NOT NULL;
