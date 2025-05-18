-- CreateTable
CREATE TABLE "ExternalModule" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "projectId" VARCHAR(22) NOT NULL,
    "userId" TEXT NOT NULL,
    "description" VARCHAR(1000),
    "isSeeded" BOOLEAN,

    CONSTRAINT "ExternalModule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExternalModule" ADD CONSTRAINT "ExternalModule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
