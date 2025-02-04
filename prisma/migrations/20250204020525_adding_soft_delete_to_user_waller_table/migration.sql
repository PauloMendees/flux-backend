/*
  Warnings:

  - Added the required column `deleted` to the `user_wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_wallet" ADD COLUMN     "deleted" BOOLEAN NOT NULL;
