-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "basedOnId" TEXT;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_basedOnId_fkey" FOREIGN KEY ("basedOnId") REFERENCES "ExternalModule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
