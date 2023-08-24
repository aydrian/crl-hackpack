/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `hackathons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "hackathons_slug_key" ON "hackathons"("slug");
