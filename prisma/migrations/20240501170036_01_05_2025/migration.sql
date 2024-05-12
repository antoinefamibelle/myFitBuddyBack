/*
  Warnings:

  - You are about to drop the `_ExerciceToWorkout` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ExerciceToWorkout" DROP CONSTRAINT "_ExerciceToWorkout_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciceToWorkout" DROP CONSTRAINT "_ExerciceToWorkout_B_fkey";

-- AlterTable
ALTER TABLE "Exercice" ADD COLUMN     "workoutId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilPicture" TEXT,
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "_ExerciceToWorkout";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Exercice" ADD CONSTRAINT "Exercice_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
