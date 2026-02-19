-- AlterTable
ALTER TABLE "product" ADD COLUMN     "banner" TEXT,
ADD COLUMN     "previewImages" TEXT[] DEFAULT ARRAY[]::TEXT[];
