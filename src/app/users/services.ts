import { logger } from '../../utils/logger';
import { DbError } from '../../utils/error';
import { prismaClient } from '../../utils';
import { User } from '@prisma/client';
import { StatusCodes } from "http-status-codes";
import { ERole, ExerciceRo, UserAuthRo } from '../../types';
import { UserCreateDto, UserLoginDto } from '../../types';
import bcrypt from 'bcrypt';
import { tokenSigning, ctxUserAuthResponse } from './helper';

const jwtSecret = process.env.JWT_SECRET || 'secret';

/**
 * Get All Exercices
 * @param {string} id
 *
 * @returns {Promise<Array<ExerciceRo>>}
 *  */
// export const getAll = async ({
//     page = 0,
//     limit = 10,
//     mucle,
//     type,
//     level,
//     name
// }: {
//     page: number;
//     limit: number;
//     mucle: string | undefined;
//     type: string | undefined;
//     level: string | undefined;
//     name: string | undefined;
// }): Promise<Array<ExerciceRo>> => {
//   try {
//     const data: Array<Exercice> = await prismaClient.exercice.findMany({
//         where: {
//           muscleGroup: mucle ? { equals: mucle } : undefined,
//           type: type ? { equals: type } : undefined,
//           name: name ? { contains: name } : undefined,
//           difficulty: level ? { equals: level } : undefined,
//         },
//         skip: page * limit,
//         take: limit,
//     });
//     const response: Array<ExerciceRo> = data.map((val) => responseBuilder(val));
//     return response;
//   } catch (err: any) {
//     logger.error(err);
//     throw new DbError(err.message);
//   }
// };

export const createUser = async (userCreateDto: UserCreateDto): Promise<Array<UserAuthRo>> => {
  const salt = await bcrypt.genSalt(10) // Generate a salt with 10 round ! The more there is round the more it is secured
  const password = await bcrypt.hash(userCreateDto.password, salt); // Hashing the password

  try {
    const user: User = await prismaClient.user.create({
      data: {
        email: userCreateDto.email,
        firstName: userCreateDto.firstName,
        lastName: userCreateDto.lastName,
        password: password,
        role: ERole.USER,
      }
    });

    const payload = { user: { id: user.id } };
    const token = tokenSigning(payload, jwtSecret);
    const response: Array<UserAuthRo> = [ctxUserAuthResponse(user, String(token))];
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
}

export const login = async (dto: UserLoginDto): Promise<Array<UserAuthRo>> => {
  try {
    const user: User | null = await prismaClient.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (!user) {
      throw new DbError('User not found');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new DbError('Invalid credentials');
    }

    const payload = { user: { id: user.id } };
    const token = await tokenSigning(payload, jwtSecret);
    const response: Array<UserAuthRo> = [ctxUserAuthResponse(user, String(token))];
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
}