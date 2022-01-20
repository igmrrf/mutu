const config = require('config');
const winston = require('winston');
const CustomError = require('../utils/responses/errorResponse');
require('express-async-errors');
require('winston-mongodb');

module.exports = () => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        format: format.json(),
      }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({ format: winston.format.simple() })
    );
  }

  process.on('unhandledRejection', (error) => {
    new CustomError(500, error.message);
  });

  logger.exceptions.handle(
    new transports.Console({
      level: 'info',
      format: format.combine(format.simple(), format.colorize()),
    }),
    new transports.File({ filename: 'uncaught.log' })
  );

  // ? Throwing unhandled rejections to uncaught errors
  logger.rejections.handle(
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      filename: 'uncaught.log',
      level: 'error',
      format: format.json(),
    })
  );

  const options = {
    db: config.get('database_url'),
    level: 'info',
    collection: 'log',
    includeIds: true,
  };
  logger.add(new winston.transports.MongoDB(options));
};
