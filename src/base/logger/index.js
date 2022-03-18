/**
 * @module lib/logger
 * @description Configures a custom logger for logging errors, and results of certain operations
 */

import winston, { format } from "winston";

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: format.combine(
        winston.format.colorize(),
        format.timestamp({
          format: "YYYY-MM-DD HH:MM:SS",
        }),
        format.simple()
      ),
    }),
  ],

  // Store all uncaught exceptions
  exceptionHandlers: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: "YYYY-MM-DD HH:MM:SS",
        }),
        format.simple()
      ),
    }),
  ],
});

export default logger;
