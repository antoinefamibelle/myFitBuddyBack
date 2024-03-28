import { logger } from '../../utils/logger';
import { DbError } from '../../utils/error';
import { prismaClient } from '../../utils';
import { Exercice } from '@prisma/client';
import { StatusCodes } from "http-status-codes";
import { ExerciceRo } from '../../types';
import { responseBuilder } from './helper';

/**
 * Get All Exercices
 * @param {string} id
 *
 * @returns {Promise<Array<ExerciceRo>>}
 *  */
export const getAll = async ({
    page = 0,
    limit = 10,
}): Promise<Array<ExerciceRo>> => {
  try {
    const data: Array<Exercice> = await prismaClient.exercice.findMany({
        skip: page * limit,
        take: limit,
    });
    const response: Array<ExerciceRo> = data.map((val) => responseBuilder(val));
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};