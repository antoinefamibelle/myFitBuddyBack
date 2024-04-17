import { logger } from '../../utils/logger';
import { DbError } from '../../utils/error';
import { prismaClient } from '../../utils';
import { User } from '@prisma/client';
import { Role, UserAuthRo, UserRo } from '../../types';
import { UserCreateDto, UserLoginDto } from '../../types';
import bcrypt from 'bcrypt';
import { tokenSigning, ctxUserAuthResponse, ctxUserResponse } from './helper';

const jwtSecret: string = process.env.JWT_SECRET || 'secret';

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
        role: Role.USER
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

export const getUserBydId = async (id: string): Promise<Array<UserRo>> => {
  try {
    const user: User | null = await prismaClient.user.findUnique({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new DbError('User not found');
    }

    const response: Array<UserRo> = [ctxUserResponse(user)];
    return response;
  } catch (err: any) {
    logger.error(err);
    throw new DbError(err.message);
  }
};