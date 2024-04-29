import { logger } from '../../utils/logger';
import { DbError } from '../../utils/error';
import { prismaClient } from '../../utils';
import { Exercice, Workout } from '@prisma/client';
import { StatusCodes } from "http-status-codes";
import { WorkoutPopulated, WorkoutRo, createWorkoutDto } from '../../types';
import { responseBuilder } from './helper';
import { equal } from 'assert';

/**
 * Get All Exercices
 * @param {string} id
 *
 * @returns {Promise<Array<WorkoutRo>>}
 *  */
export const getAll = async ({
    page = 0,
    limit = 10,
    id,
    name
}: {
    page: number;
    limit: number;
    id: string | undefined;
    name: string | undefined;
}): Promise<Array<WorkoutRo>> => {
  try {
    const data: Array<WorkoutPopulated> = await prismaClient.workout.findMany({
        where: {
          id: id ? { equals: id } : undefined,
          name: name ? { contains: name } : undefined,
        },
        include: {
          exercices: true,
        },
        skip: page * limit,
        take: limit,
    }) as Array<WorkoutPopulated>;
    const response: Array<WorkoutRo> = data.map((val) => responseBuilder(val));
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

/**
 * Create a Workout
 * @param {createWorkoutDto} data
 * @returns {Promise<WorkoutRo>}
 * @POST /workout
 */

export const create = async ({
  data,
  user_id,
}: {
  data: createWorkoutDto
  user_id: string
}): Promise<WorkoutRo> => {
  try {
    const workout: Workout = await prismaClient.workout.create({
      data: {
        name: data.name,
        description: data.description,
        duration: data.duration,
        difficulty: data.difficulty,
        user: {
            connect: { id: user_id }
          },
        exercices: {
          connect: data.exercices.map((id) => ({ id }))
        },
      },
    });
    const createdWorkout = await prismaClient.workout.findUnique({
      where: {
        id: workout.id
      },
      include: {
        exercices: true
      }
    }) as WorkoutPopulated;
    return responseBuilder(createdWorkout);
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

/**
 * Get a Workout by id
 * @param {string} id
 * @returns {Promise<WorkoutRo>}
 * @GET /workout/:id
 */

export const getById = async (id: string): Promise<WorkoutRo> => {
  try {
    const data: WorkoutPopulated = await prismaClient.workout.findUnique({
      where: {
        id: id
      },
      include: {
        exercices: true
      }
    }) as WorkoutPopulated;
    return responseBuilder(data);
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

/**
 * Update a Workout
 * @param {string} id
 * @param {createWorkoutDto} data
 * @returns {Promise<WorkoutRo>}
 * @PUT /workout/:id
 */

export const update = async (id: string, data: createWorkoutDto): Promise<WorkoutRo> => {
  try {
    const workout: Workout = await prismaClient.workout.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        duration: data.duration,
        difficulty: data.difficulty,
        exercices: {
          connect: data.exercices.map((id) => ({ id }))
        },
      },
    });
    const updatedWorkout = await prismaClient.workout.findUnique({
      where: {
        id: workout.id
      },
      include: {
        exercices: true
      }
    }) as WorkoutPopulated;
    return responseBuilder(updatedWorkout);
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};

/**
 * Delete a Workout
 * @param {string} id
 * @returns {Promise<void>}
 * @DELETE /workout/:id
 */

export const remove = async (id: string): Promise<void> => {
  try {
    await prismaClient.workout.delete({
      where: { id },
    });
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  } 
}

/**
 * Get Workout by user id
 * @param {string} user_id
 * @returns {Promise<Array<WorkoutRo>>}
 * @GET /workout/me
 */

export const getMyWorkouts = async (user_id: string): Promise<Array<WorkoutRo> | []> => {
  try {
    const data: Array<WorkoutPopulated> = await prismaClient.workout.findMany({
      where: {
        userId: user_id
      },
      include: {
        exercices: true
      }
    }) as Array<WorkoutPopulated>;
    const response: Array<WorkoutRo> = data.map((val) => responseBuilder(val));
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
}