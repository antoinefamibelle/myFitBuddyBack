// create an express server
import express, { Application } from 'express';
import { Request, Response } from 'express';
import { Server } from 'http';
import figlet from "figlet";
import { logger, closeGracefullyEverything } from './utils';
import router from './router';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const port = process.env.SERVER_PORT || 3000;
const project_name = process.env.PROJECT_NAME || 'ANONYMOUS';

let server: Server | undefined;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

/**
 * Declare routes.
 */
app.use(router);

try {
      server = app.listen(port, async (): Promise<void> => {
      logger.info(`Server is listening on the http://localhost:${port}`);
      figlet(`${project_name} SERVER ${port}`, (err, data) => {
        if(err) {
          logger.error("Something went wrong...", err)
          return
        };
        logger.info(data)
      })
    });
  } catch (error) {
    console.error(`Error occured`);
  }
  
  /**
   * Close gracefully the server.
   */
  closeGracefullyEverything({
    app: server
  })