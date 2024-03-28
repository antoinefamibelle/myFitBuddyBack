import { ExerciceRo } from '../../types';
import { Exercice } from '@prisma/client'

export const responseBuilder = (val: Exercice): ExerciceRo => {
    return {
        id: val.id,
        type: val.type as string,
        name: val.name,
        equipment: val.equipment as string,
        instructions: val.instructions as string,
        difficulty: val.difficulty as string,
        muscleGroup: val.muscleGroup as string,
        createdAt: val.createdAt,
        updatedAt: val.updatedAt
    };
};