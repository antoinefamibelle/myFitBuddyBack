import { ExerciceWithImage } from '@prisma/client';

export type ExerciceRo = {
    id: string;
    bodyPart?: string;
    name?: string;
    image?: string;
    target?: string;
    secondaryMuscle?: string[];
    instructions?: string[];
    userId?: string;
    workoutId?: string;
}
