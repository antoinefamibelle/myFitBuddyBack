import { Workout } from '@prisma/client';
import { ExerciceRo } from '../exercice';

export type WorkoutRo = {
    id: string;
    name: string;
    description?: string;
    duration?: number;
    difficulty?: string;
    ExerciceWithImage: Array<ExerciceRo>;
    createdAt: Date;
    updatedAt: Date;
};

export type WorkoutPopulated = Workout & {
    ExerciceWithImage: Array<ExerciceRo>;
};

export type createWorkoutDto = {
    name: string;
    description?: string;
    duration?: number;
    difficulty?: string;
    ExerciceWithImage: Array<string>;
};