import express, { Router } from 'express';

import exerciceRouter from './app/exercice/router';

/**
* @main
* @description
* Declaration of main router
**/

const router: Router = express.Router();

router.use('/api/v1/', [
    router.use('/exo', exerciceRouter)
]);

export default router;
