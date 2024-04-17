import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { UserRo, UserAuthRo } from "../../types";

export function ctxUserResponse(user: User): UserRo {
    return {
        id                : user.id,
        email             : user.email,
        firstName         : user.firstName,
        lastName          : user.lastName,
        profilPic         : user.profilPicture || '',
        createdAt         : user.createdAt,
        updatedAt         : user.updatedAt,
    };
}

export function ctxUserAuthResponse(user: User, token: string): UserAuthRo {
  return {
    id                : user.id,
    email             : user.email,
    firstName         : user.firstName,
    lastName          : user.lastName,
    createdAt         : user.createdAt,
    updatedAt         : user.updatedAt,
    profilPic         : user.profilPicture || '',
    token             : token,
  };
}

export function tokenSigning(payload: any, jwtSecret: string): string {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600 * 24 * 31 });
  return token;
}
