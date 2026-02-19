/*
  Warnings:

  - A unique constraint covering the columns `[sectionId,slug]` on the table `doc_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId,slug,parentId]` on the table `doc_item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `doc_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable: Add slug as nullable first, populate from title, then make required
ALTER TABLE "doc_category" ADD COLUMN     "slug" TEXT;
UPDATE "doc_category" SET "slug" = LOWER(REGEXP_REPLACE(REGEXP_REPLACE("title", '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g'));
ALTER TABLE "doc_category" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "doc_item" ADD COLUMN     "parentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "doc_category_sectionId_slug_key" ON "doc_category"("sectionId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "doc_item_categoryId_slug_parentId_key" ON "doc_item"("categoryId", "slug", "parentId");

-- AddForeignKey
ALTER TABLE "doc_item" ADD CONSTRAINT "doc_item_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "doc_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
