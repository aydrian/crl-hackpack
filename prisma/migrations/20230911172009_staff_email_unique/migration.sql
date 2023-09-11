/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `staff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "staff_email_key" ON "staff"("email");
