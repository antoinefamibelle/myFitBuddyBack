import express, { Router } from 'express';
import { getAll } from './exercice.controller';

/**
* @main
* @description
* Declaration of main router
**/
const exerciceRouter: Router = express.Router();

/**
 * @method GET
 */
exerciceRouter.get('/', getAll);


export default exerciceRouter;
