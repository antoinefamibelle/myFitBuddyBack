import { WorkoutPopulated, WorkoutRo } from '../../types';
import { Workout } from '@prisma/client'

export const responseBuilder = (val: WorkoutPopulated): WorkoutRo => {
    return {
        id: val.id,
        name: val.name,
        description: val.description ?? undefined,
        duration: val.duration ?? undefined,
        difficulty: val.difficulty ?? undefined,
        exercices: val.exercices ?? [],
        createdAt: val.createdAt,
        updatedAt: val.updatedAt
    };
};