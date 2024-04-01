import express, { Router } from 'express';
import { getAll, favorite } from './controller';
import { auth } from '../../middleware';

/**
* @main
* @description
* Declaration of main router
**/
const exerciceRouter: Router = express.Router();

/**
 * @method GET
 */
exerciceRouter.get('/', auth, getAll);

/**
 * @method POST
 */
exerciceRouter.post('/favorite/:id', auth, favorite);

export default exerciceRouter;
