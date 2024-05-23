import { ExerciceRo } from '../../types';
import { ExerciceWithImage } from '@prisma/client'

export const responseBuilder = (val: ExerciceWithImage): ExerciceRo => {
    return {
        id: val.id,
        bodyPart: val.bodyPart || '',
        name: val.name,
        image: val.image || '',
        target: val.target || '',
        secondaryMuscle: val.secondaryMuscle,
        instructions: val.instructions,
        userId: val.userId || '',
        workoutId: val.workoutId || '',
    };
};