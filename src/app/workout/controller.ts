import { StatusCodes } from "http-status-codes";
import { stripAnsi } from "../../utils/error";
import { WorkoutRo, ResponseRo, createWorkoutDto } from "../../types";
import * as service from './services';
import { logger, prismaClient } from "../../utils";
import { NextFunction, Request, Response } from 'express';

/**
 * Basic CRUD controllers.
 */

/**
 * @GET /exercice
 * @description Get all exercices
 * @auth
 */
export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const page: number = Number(req?.query?.page) || 0;
  const limit: number = Number(req?.query?.limit) || 10;
  const name: string | undefined = req?.query?.name as string | undefined;
  const id: string | undefined = req?.query?.id as string | undefined;

  try {
    const data: Array<WorkoutRo> = await service.getAll({
        page,
        limit,
        id,
        name,
    });
    const count: number = data.length;
    const response: ResponseRo = {
        status_code: StatusCodes.OK,
        message: 'Success',
        data: data,
        errors: [],
    };
    res.status(response.status_code).json(response);
  } catch (err: any) {
    if (err.name === 'DbError') {
        const response: ResponseRo = {
            status_code: StatusCodes.BAD_REQUEST,
            message: stripAnsi(err.message),
            data: [],
            errors: [],
        };
        res.status(response.status_code).json(response);
    } else {
        const response: ResponseRo = {
            status_code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            data: [],
            errors: [],
        };
        res.status(response.status_code).json(response);
    }
  }
};


/**
 * Specific controllers.
 * @POST /favorite/:id
 * @description Add or remove an exercice from favorite
 * @auth
 */
export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId: string = res.locals.user.id as string; // Get user id from token
    const dto: createWorkoutDto = req.body as createWorkoutDto;
  
    const data: WorkoutRo = await service.create({
      data: dto,
      user_id: userId,
    })
    const response: ResponseRo = {
        status_code: StatusCodes.OK,
        message: 'Success',
        data: data,
        errors: [],
    };
    res.status(response.status_code).json(response);
  } catch (err: any) {
    if (err.name === 'DbError') {
        const response: ResponseRo = {
            status_code: StatusCodes.BAD_REQUEST,
            message: stripAnsi(err.message),
            data: [],
            errors: [],
        };
        res.status(response.status_code).json(response);
    } else {
        const response: ResponseRo = {
            status_code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            data: [],
            errors: [],
        };
        res.status(response.status_code).json(response);
    }
  }
};