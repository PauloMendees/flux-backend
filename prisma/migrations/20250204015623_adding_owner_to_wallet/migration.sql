/*
  Warnings:

  - Added the required column `ownerId` to the `wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallet" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
