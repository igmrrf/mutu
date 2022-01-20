require('dotenv').config();
const express = require('express');
const config = require('config');
const winston = require('winston');
const CustomError = require('./utils/responses/errorResponse');
const morgan = require('morgan');
require('express-async-errors');
require('winston-mongodb');
const app = express();

if (!config.has('default_env'))
  new CustomError(500, 'Environmental Variables Not Loaded');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

process.on('unhandledRejection', (error) => {
  new CustomError(500, error.message);
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );

  app.use(morgan('combined'));
  logger.info('Morgan Enabled');
}

const options = {
  useUnifiedTopology: true,
  db: config.get('database_url'),
  level: 'info',
  name: 'logs',
  collection: 'logs',
  includeIds: true,
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
};
logger.add(new winston.transports.MongoDB(options));

require('./loaders/database')(logger);
require('./loaders/routes')(app, logger);

const PORT = config.get('port') || 8080;

const server = app.listen(PORT, () =>
  logger.info(`Server running on Port ${PORT}`)
);

module.exports = server;
