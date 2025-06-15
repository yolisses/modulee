/*
  Warnings:

  - The primary key for the `ExternalModule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `basedOnId` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `ExternalModule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `projectId` on the `ExternalModule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `ExternalModule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Like` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Like` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `externalModuleId` on the `Like` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ExternalModule" DROP CONSTRAINT "ExternalModule_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_externalModuleId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_basedOnId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- AlterTable
ALTER TABLE "ExternalModule" DROP CONSTRAINT "ExternalModule_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "projectId",
ADD COLUMN     "projectId" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ADD CONSTRAINT "ExternalModule_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "externalModuleId",
ADD COLUMN     "externalModuleId" UUID NOT NULL,
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "basedOnId",
ADD COLUMN     "basedOnId" UUID,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_externalModuleId_key" ON "Like"("userId", "externalModuleId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_basedOnId_fkey" FOREIGN KEY ("basedOnId") REFERENCES "ExternalModule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalModule" ADD CONSTRAINT "ExternalModule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_externalModuleId_fkey" FOREIGN KEY ("externalModuleId") REFERENCES "ExternalModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
