import express, { Router } from 'express';
import { getAll, create, getMyWorkouts } from './controller';
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
router.get('/me', auth, getMyWorkouts);

/**
 * @method POST
 */
router.post('/', auth, create);

export default router;
