-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('ITEM_IN_SHED', 'BEING_ASSESSED', 'PARTS_COSTED', 'PARTS_PURCHASE_APPROVED_BY_CUSTOMER', 'PARTS_ORDERED', 'PARTS_ARRIVED', 'REAPIR_IN_HAND', 'REAPIR_NOT_SUCCESSFUL', 'COMPLETE_REPAIR_SUCCESSFUL', 'COMPLETE_ITEM_NOT_REPAIRED', 'COMPLETE_ITEM_SCRAPPER', 'CANT_FIND');

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "title" TEXT,
    "firstNames" TEXT,
    "lastName" TEXT,
    "phone" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "parts" TEXT,
    "repairs" TEXT,
    "status" "JobStatus" NOT NULL DEFAULT 'ITEM_IN_SHED',

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
