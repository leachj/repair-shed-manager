-- CreateEnum
CREATE TYPE "JobAuditType" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "JobAudit" (
    "id" SERIAL NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "JobAuditType" NOT NULL,
    "by" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "field" TEXT,
    "previousValue" TEXT,
    "newValue" TEXT,

    CONSTRAINT "JobAudit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobAudit" ADD CONSTRAINT "JobAudit_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
