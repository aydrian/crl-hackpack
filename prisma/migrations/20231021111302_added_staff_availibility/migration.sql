-- AlterTable
ALTER TABLE "hackathon_staff" ADD COLUMN     "availability" DATE[] DEFAULT ARRAY[]::DATE[];
