import { NextFunction, Request, Response } from 'express';
import winston from 'winston';
import { AbstractConfigSetColors, AbstractConfigSetLevels } from 'winston/lib/winston/config';

import { ILevel, IColor } from './logger.d';

/**
 * Setup level of logs.
 */
const level = (): string => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development' ? 'debug' : 'warn';
};
const levels: ILevel = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

/**
 * Add color of logs.
 */
const colors: IColor = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};
winston.addColors(colors as unknown as AbstractConfigSetColors);

/**
 * Format of logs.
 */
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

/**
 * Transports of logs.
 */
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  new winston.transports.File({ filename: 'logs/all.log' }),
];

/**
 * Setup of logs.
 */
export const logger = winston.createLogger({
  level: level(),
  levels: levels as unknown as AbstractConfigSetLevels,
  format,
  transports,
});

/**
 * Create middleware of logs.
 */
export const loggerMiddleware = (req: Request, resp: Response, next: NextFunction): void => {
  logger.info(`LOGGED: ${req.method} | ${req.path}`);
  next();
};
