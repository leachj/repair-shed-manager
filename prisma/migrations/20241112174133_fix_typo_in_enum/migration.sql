/*
  Warnings:

  - The values [CLOTHIN] on the enum `JobCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobCategory_new" AS ENUM ('ELECTRICAL', 'ELECTRONIC', 'MECHANICAL', 'CLOTHING', 'CERAMIC', 'WOODWORK');
ALTER TABLE "Job" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "category" TYPE "JobCategory_new" USING ("category"::text::"JobCategory_new");
ALTER TYPE "JobCategory" RENAME TO "JobCategory_old";
ALTER TYPE "JobCategory_new" RENAME TO "JobCategory";
DROP TYPE "JobCategory_old";
ALTER TABLE "Job" ALTER COLUMN "category" SET DEFAULT 'ELECTRICAL';
COMMIT;
