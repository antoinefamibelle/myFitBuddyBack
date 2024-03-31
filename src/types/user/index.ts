import { User } from '@prisma/client';

export type UserRo = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserAuthRo = UserRo & {
    token: string;
};

export type UserCreateDto = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type UserUpdateDto = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};

export type UserLoginDto = {
    email: string;
    password: string;
}

export enum ERole {
    ADMIN = 'admin',
    USER = 'user'
}