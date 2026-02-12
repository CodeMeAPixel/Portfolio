-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED', 'CHANGES_REQUESTED');

-- CreateEnum
CREATE TYPE "CommentRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "client_review" ADD COLUMN     "denialReason" TEXT,
ADD COLUMN     "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "review_comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" "CommentRole" NOT NULL,
    "reviewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "review_comment" ADD CONSTRAINT "review_comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "client_review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
