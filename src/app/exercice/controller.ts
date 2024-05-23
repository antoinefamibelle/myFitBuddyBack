import { StatusCodes } from "http-status-codes";
import { stripAnsi } from "../../utils/error";
import { ExerciceRo, ResponseRo } from "../../types";
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
  const muscle: string | undefined = req?.query?.muscle as string | undefined;
  const type: string | undefined = req?.query?.type as string | undefined;
  const level: string | undefined = req?.query?.level as string | undefined;
  const name: string | undefined = req?.query?.name as string | undefined;

  console.log('page', page)
  try {
    const data: Array<ExerciceRo> = await service.getAll({
        page,
        limit,
        muscle,
        type,
        level,
        name,
    });
    const count: number = data.length;
    const response: ResponseRo<ExerciceRo[]> = {
        status_code: StatusCodes.OK,
        message: 'Success',
        data: data,
        errors: [],
    };
    res.status(response.status_code).json(response);
  } catch (err: any) {
    if (err.name === 'DbError') {
        const response: ResponseRo<[]> = {
            status_code: StatusCodes.BAD_REQUEST,
            message: stripAnsi(err.message),
            data: [],
            errors: [],
        };
        res.status(response.status_code).json(response);
    } else {
        const response: ResponseRo<[]> = {
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
export const favorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id: string = req?.params.id as string;
    const user_id: string = res.locals.user.id;
    
    const user = await prismaClient.user.findUnique({
      where: {
        id: user_id
      },
      include: {
        favorites: true
      }
    });

    // Check if user exists
    if (!user) {
      logger.error(`[User] ${user_id} not found`);
      const response: ResponseRo<[]> = {
        status_code: StatusCodes.NOT_FOUND,
        message: 'User not found',
        data: [],
        errors: [],
      };
      res.status(response.status_code).json(response);
      return;
    }

    // Check if exercice exists
    const exercice = await prismaClient.exercice.findUnique({
      where: {
        id: id
      }
    });

    if (!exercice) {
      logger.error(`[Exercice] ${id} not found`);
      const response: ResponseRo<[]> = {
        status_code: StatusCodes.NOT_FOUND,
        message: 'Exercice not found',
        data: [],
        errors: [],
      };
      res.status(response.status_code).json(response);
      return;
    }

    // Check if exercice is already in favorite
    if (user.favorites.find((favorite) => favorite.id === id)) {
      await prismaClient.user.update({
        where: {
          id: user_id
        },
        data: {
          favorites: {
            disconnect: {
              id: id
            }
          }
        }
      });
    }
    else {
      await prismaClient.user.update({
        where: {
          id: user_id
        },
        data: {
          favorites: {
            connect: {
              id: id
            }
          }
        }
      });
    }
    const response: ResponseRo<[]> = {
      status_code: StatusCodes.OK,
      message: 'Success',
      data: [],
      errors: [],
    };
    res.status(response.status_code).json(response);
  } catch(err) {
    logger.error(err);
    const response: ResponseRo<[]> = {
      status_code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      data: [],
      errors: [],
    };
    res.status(response.status_code).json(response);
  }
};