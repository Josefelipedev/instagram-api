/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `InstagramSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InstagramSession_username_key" ON "InstagramSession"("username");
