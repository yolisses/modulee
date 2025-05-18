-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_externalModuleId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_externalModuleId_fkey" FOREIGN KEY ("externalModuleId") REFERENCES "ExternalModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
