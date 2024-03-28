import { StatusCodes } from "http-status-codes";
import { stripAnsi } from "../../utils/error";
import { ExerciceRo, ResponseRo } from "../../types";
import * as service from './exercice.service';

import { NextFunction, Request, Response } from 'express';

/**
 * Basic CRUD controllers.
 */
export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const page: number = Number(req?.query?.page) || 0;
  const limit: number = Number(req?.query?.limit) || 10;

  try {
    const users: Array<ExerciceRo> = await service.getAll({
        page,
        limit,
    });
    const count: number = users.length;
    const response: ResponseRo = {
        status_code: StatusCodes.OK,
        message: 'Success',
        data: users,
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
