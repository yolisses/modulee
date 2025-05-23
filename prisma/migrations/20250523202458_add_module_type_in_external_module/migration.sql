/*
  Warnings:

  - Added the required column `moduleType` to the `ExternalModule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ModuleType" AS ENUM ('effect', 'utility', 'instrument');

-- AlterTable
ALTER TABLE "ExternalModule" ADD COLUMN     "moduleType" "ModuleType" NOT NULL;
