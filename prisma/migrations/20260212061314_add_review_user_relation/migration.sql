-- AlterTable
ALTER TABLE "client_review" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "client_review" ADD CONSTRAINT "client_review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
