-- CreateTable
CREATE TABLE "ExerciceWithImage" (
    "id" TEXT NOT NULL,
    "bodyPart" TEXT,
    "equipment" TEXT,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "target" TEXT,
    "secondaryMuscle" TEXT[],
    "instructions" TEXT[],
    "userId" TEXT,
    "workoutId" TEXT,

    CONSTRAINT "ExerciceWithImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExerciceWithImage_name_key" ON "ExerciceWithImage"("name");

-- AddForeignKey
ALTER TABLE "ExerciceWithImage" ADD CONSTRAINT "ExerciceWithImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciceWithImage" ADD CONSTRAINT "ExerciceWithImage_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
