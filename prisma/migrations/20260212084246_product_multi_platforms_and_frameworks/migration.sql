/*
  Warnings:

  - You are about to drop the column `framework` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "framework",
DROP COLUMN "platform",
ADD COLUMN     "frameworks" "ProductFramework"[] DEFAULT ARRAY[]::"ProductFramework"[],
ADD COLUMN     "platforms" "ProductPlatform"[] DEFAULT ARRAY[]::"ProductPlatform"[];
