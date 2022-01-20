const mongoose = require('mongoose');
const uriFormat = require('mongodb-uri');
const config = require('config');

const encodeMongoURI = (uriString) => {
  if (uriString) {
    let parsed = uriFormat.parse(uriString);
    uriString = uriFormat.format(parsed);
  }
  return uriString;
};

if (process.env.NODE_ENV === 'production') mongoose.set('autoIndex', false);

const url = config.get('database_url');

module.exports = (logger) => {
  mongoose.connect(encodeMongoURI(url));
  const db = mongoose.connection;

  db.on('error', () => {
    logger.error('There has been an error connecting to the database');
  });

  db.on('open', () => {
    logger.info('We are Connected');
  });

  db.on('disconnect', () => {
    logger.info('Mongo DB disconnected');
  });
};
