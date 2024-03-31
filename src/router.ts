import express, { Router } from 'express';

import exerciceRouter from './app/exercice/router';
import userRouter from './app/users/router';

/**
* @main
* @description
* Declaration of main router
**/

const router: Router = express.Router();

router.use('/api/v1/', [
    router.use('/exo', exerciceRouter),
    router.use('/users', userRouter)
]);

export default router;
