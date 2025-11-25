import winston from "winston";
import "winston-mongodb";

import { LOG_DB_URI } from "./server.config.js";

const allowedTransports = [];

// Console transport for logging to the console

allowedTransports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
      )
    ),
  })
);


// MongoDB transport for logging to a MongoDB database

allowedTransports.push(
  new winston.transports.MongoDB({
    level: "error",
    db: LOG_DB_URI,
  })
);

// File transport for logging to a file

allowedTransports.push(
  new winston.transports.File({
    filename: "app.log",
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
      )
    ),
  })
);

const logger = winston.createLogger({
  level: "info",
  transports: allowedTransports,
});

export default logger;