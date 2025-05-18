/*
  Warnings:

  - Added the required column `graph` to the `ExternalModule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExternalModule" ADD COLUMN     "graph" JSONB NOT NULL;
