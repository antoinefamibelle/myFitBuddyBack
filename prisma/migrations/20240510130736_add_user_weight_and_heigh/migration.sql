/*
  Warnings:

  - You are about to drop the column `userHeight` on the `Exercice` table. All the data in the column will be lost.
  - You are about to drop the column `userWeight` on the `Exercice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercice" DROP COLUMN "userHeight",
DROP COLUMN "userWeight";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "height" INTEGER,
ADD COLUMN     "weight" INTEGER;
