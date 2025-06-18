/*
  Warnings:

  - You are about to drop the column `isSeeded` on the `ExternalModule` table. All the data in the column will be lost.
  - You are about to drop the column `isSeeded` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExternalModule" DROP COLUMN "isSeeded",
ADD COLUMN     "isForDevTesting" BOOLEAN;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isSeeded",
ADD COLUMN     "isForDevTesting" BOOLEAN;
