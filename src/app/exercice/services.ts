import { logger } from '../../utils/logger';
import { DbError } from '../../utils/error';
import { prismaClient } from '../../utils';
import { ExerciceRo } from '../../types';
import { responseBuilder } from './helper';
import { ExerciceWithImage } from '@prisma/client';

/**
 * Get All Exercices
 * @param {string} id
 *
 * @returns {Promise<Array<ExerciceRo>>}
 *  */
export const getAll = async ({
    page = 0,
    limit = 10,
    muscle,
    name
}: {
    page: number;
    limit: number;
    muscle: string | undefined;
    type: string | undefined;
    level: string | undefined;
    name: string | undefined;
}): Promise<Array<ExerciceRo>> => {
  try {
    const query = {
        skip: page * limit,
        take: limit,
        where: {
            bodyPart: muscle ? {
              contains: muscle,
            } : undefined,
            secondaryMuscle: muscle ? {
              has: muscle,
            } : undefined,
            name: {
              contains: name,
            },
        }
    }
    const data: Array<ExerciceWithImage> = await prismaClient.exerciceWithImage.findMany({
      ...query
    });
    const response: Array<ExerciceRo> = data.map((val) => responseBuilder(val));
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};