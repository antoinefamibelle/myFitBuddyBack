import express, { Router } from 'express';
import { register, login, getCurrentUser, getCurrentUserStats} from './controller';
import { auth } from '../../middleware';

/**
* @main
* @description
* Declaration of main router
**/
const userRouter: Router = express.Router();

/**
 * @method GET
 */
userRouter.get('/me', auth, getCurrentUser);
userRouter.get('/statistics', auth, getCurrentUserStats);

/**
 * @method POST
 */
userRouter.post('/auth/register', register);
userRouter.post('/auth/login', login)


export default userRouter;
