/*
  Warnings:

  - Added the required column `deleted` to the `wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallet" ADD COLUMN     "deleted" BOOLEAN NOT NULL;
