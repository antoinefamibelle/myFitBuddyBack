import { Exercice } from '@prisma/client';

export type ExerciceRo = {
    id: string;
    type: string;
    name: string;
    equipment: string;
    instructions: string;
    difficulty: string;
    muscleGroup: string;
    createdAt: Date;
    updatedAt: Date;
}
  