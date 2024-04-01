import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const jwtSecret =  process.env.JWT_SECRET || "secretJWT";

/**
 * @module Authentification
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description This is the middleware used to make route private by checking the jwt
 */
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token'); // Get the token

  if (!token)
    return res.status(401).json({ msg: 'No Token ! Authorization denied' });

  try {
    const decoded: any = jwt.verify(token, jwtSecret);
    res.locals.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: 'Token is not valid' }); //Token isnt valid
  }
}