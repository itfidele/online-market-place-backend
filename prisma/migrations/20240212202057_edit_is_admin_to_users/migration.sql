/*
  Warnings:

  - You are about to drop the column `user_type` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `user_type`,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false;
