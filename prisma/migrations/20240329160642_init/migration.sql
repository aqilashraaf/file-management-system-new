/*
  Warnings:

  - You are about to drop the column `path` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `File` table. All the data in the column will be lost.
  - Added the required column `size` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "path",
DROP COLUMN "updatedAt",
ADD COLUMN     "size" INTEGER NOT NULL;
