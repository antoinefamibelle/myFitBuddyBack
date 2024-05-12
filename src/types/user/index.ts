import { User } from '@prisma/client';

export type UserRo = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profilPic: string;
    userHeigth: number;
    userWeight: number;
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

export type UserLoginDto = {
    email: string;
    password: string;
}

export type UserUpdateDto = {
    firstName?: string;
    lastName?: string;
    profilPic?: string;
    username?: string;
    userHeigth?: number;
    userWeight?: number;
};

//create enum of role
export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export type UserStatistiquesRo = {
    user: UserRo;
    daily: {
        totalWorkout: number;
        totalExercices: number;
        totalCalories: number;
    },
    weekly: {
        totalWorkout: number;
        totalExercices: number;
        totalCalories: number;
    },
    monthly: {
        totalWorkout: number;
        totalExercices: number;
        totalCalories: number;
    },
};