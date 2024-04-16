import express, { Router } from 'express';
import { getAll, create } from './controller';
import { auth } from '../../middleware';

/**
* @main
* @description
* Declaration of main router
**/
const router: Router = express.Router();

/**
 * @method GET
 */
router.get('/', auth, getAll);

/**
 * @method POST
 */
router.post('/', auth, create);

export default router;
