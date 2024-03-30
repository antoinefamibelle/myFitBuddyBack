import express, { Router } from 'express';
import { register, login } from './controller';

/**
* @main
* @description
* Declaration of main router
**/
const userRouter: Router = express.Router();

/**
 * @method GET
 */
userRouter.get('/', getAll);

/**
 * @method POST
 */
userRouter.post('/auth/register', register);
userRouter.post('/auth/login', login)


export default userRouter;
