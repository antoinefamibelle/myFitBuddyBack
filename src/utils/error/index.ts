import { Server } from "http";
import { logger } from "../logger";

/**
 * @description
 * Throw an error with a custom name DB
 **/
export class DbError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DbError" as string;
  }
}

/**
 * @description
 * Remove Ansi character from string (color)
 **/
const ansiRegex = ({ onlyFirst = false } = {}) => {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
  ].join('|');

  return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

export const stripAnsi = (str: string) => {
  return str.replace(ansiRegex(), '')
}

/**
 * @description
 * Close gracefully everything from the server
 **/
export const closeGracefullyEverything = (config: ICloseGracefullyEverythingConfig): void => {
  const app: Server | undefined = config.app;

  if (!app) {
    return;
  }

  process.on("unhandledRejection", async e => {
    try {
      logger.warn(`Process on unhandledRejection: ${e}`);
      if(app.listening){
        app.close(async() => {
          logger.warn("✔️ Http server closed");
          process.kill(process.pid, "SIGTERM");
          process.exit(0);
        })
      }
    } catch(_) {
      process.exit(1);
    }
  });
  process.on("uncaughtException", async e => {
    try {
      logger.warn(`Process on uncaughtException: ${e}`);
      if(app.listening){
        app.close(async() => {
          logger.warn("✔️ Http server closed");
          process.kill(process.pid, "SIGTERM");
          process.exit(0);
        })
      }
    } catch(_) {
      process.exit(1);
    }
  });

  process.on("SIGTERM", async () => {
    try {
      logger.warn("SIGTERM signal received");
      logger.warn("🙇 - PLEASE WAIT - 🙇");
      if(app.listening){
        app.close(async() => {
          logger.warn("✔️ Http server closed");
          process.kill(process.pid, "SIGTERM");
          process.exit(0);
        })
      }
    } catch(err) {
      logger.error("❌ Error:", err);
      process.kill(process.pid, "SIGTERM");
      process.exit(1);
    }
  });
  process.on("SIGINT", async () => {
    try {
      logger.warn("SIGINT signal received");
      logger.warn("🙇 - PLEASE WAIT - 🙇");
      if(app.listening){
        app.close(async() => {
          logger.warn("✔️ Http server closed");
          process.kill(process.pid, "SIGINT");
          process.exit(0);
        })
      }
    } catch(err) {
      logger.error("❌ Error:", err);
      process.kill(process.pid, "SIGINT");
      process.exit(1);
    };
  });
  process.on("SIGUSR2", async () => {
    try {
      logger.warn("SIGUSR2 signal received");
      logger.warn("🙇 - PLEASE WAIT - 🙇");
      if(app.listening){
        app.close(async() => {
          logger.warn("✔️ Http server closed");
          process.kill(process.pid, "SIGUSR2");
          process.exit(0);
        })
      }
    } catch(err) {
      logger.error("❌ Error:", err);
      process.kill(process.pid, "SIGUSR2");
      process.exit(1);
    }
  });
}

interface ICloseGracefullyEverythingConfig {
  app: Server | undefined
}
