import { StatusCodes } from "http-status-codes";
import { stripAnsi } from "../../utils/error";
import { ExerciceRo, ResponseRo, UserLoginDto, UserStatistiquesRo } from "../../types";
import * as service from './services';
import { UserCreateDto, UserRo, UserUpdateDto } from '../../types';
import { NextFunction, Request, Response } from 'express';

/**
 * Basic CRUD controllers.
 */
// export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const page: number = Number(req?.query?.page) || 0;
//   const limit: number = Number(req?.query?.limit) || 10;
//   const mucle: string | undefined = req?.query?.mucle as string | undefined;
//   const type: string | undefined = req?.query?.type as string | undefined;
//   const level: string | undefined = req?.query?.level as string | undefined;
//   const name: string | undefined = req?.query?.name as string | undefined;

//   try {
//     const data: Array<ExerciceRo> = await service.getAll({
//         page,
//         limit,
//         mucle,
//         type,
//         level,
//         name,
//     });
//     const count: number = data.length;
//     const response: ResponseRo = {
//         status_code: StatusCodes.OK,
//         message: 'Success',
//         data: data,
//         errors: [],
//     };
//     res.status(response.status_code).json(response);
//   } catch (err: any) {
//     if (err.name === 'DbError') {
//         const response: ResponseRo = {
//             status_code: StatusCodes.BAD_REQUEST,
//             message: stripAnsi(err.message),
//             data: [],
//             errors: [],
//         };
//         res.status(response.status_code).json(response);
//     } else {
//         const response: ResponseRo = {
//             status_code: StatusCodes.INTERNAL_SERVER_ERROR,
//             message: 'Internal Server Error',
//             data: [],
//             errors: [],
//         };
//         res.status(response.status_code).json(response);
//     }
//   }
// };

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dto: UserCreateDto = req.body;
  try {
    const data: Array<UserRo> = await service.createUser(dto);
    const response: ResponseRo<UserRo[]> = {
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

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dto: UserLoginDto = req.body;
  try {
    const data: Array<UserRo> = await service.login(dto);
    const response: ResponseRo<UserRo[]> = {
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

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user_id = res.locals.user.id;
    const data: Array<UserRo> = await service.getUserBydId(user_id);
    const response: ResponseRo<UserRo[]> = {
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
  };
};

export const getCurrentUserStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user_id = res.locals.user.id;
    const data: Array<UserRo> = await service.getUserBydId(user_id);

    const stats: UserStatistiquesRo = {
        user: data[0],
        daily: {
            totalWorkout: 0,
            totalExercices: 0,
            totalCalories: 0,
        },
        weekly: {
            totalWorkout: 0,
            totalExercices: 0,
            totalCalories: 0,
        },
        monthly: {
            totalWorkout: 0,
            totalExercices: 0,
            totalCalories: 0,
        },
    };
    const response: ResponseRo<UserStatistiquesRo> = {
        status_code: StatusCodes.OK,
        message: 'Success',
        data: stats,
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
  };
}