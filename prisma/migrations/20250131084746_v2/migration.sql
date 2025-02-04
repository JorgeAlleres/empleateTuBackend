/*
  Warnings:

  - You are about to drop the column `tytle` on the `Offer` table. All the data in the column will be lost.
  - Added the required column `title` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "tytle",
ADD COLUMN     "title" TEXT NOT NULL;
