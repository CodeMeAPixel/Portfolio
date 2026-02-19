/*
  Warnings:

  - You are about to drop the column `projectUrl` on the `doc_section` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doc_item" ADD COLUMN     "projectUrl" TEXT;

-- AlterTable
ALTER TABLE "doc_section" DROP COLUMN "projectUrl";
