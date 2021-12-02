"use strict";

var winston = require("winston");

var config = require("config");

var mongoose = require("mongoose");

console.log(config.has("db"));

module.exports = function (logger) {
  return mongoose.createConnection(config.get("db"), {
    serverSelectionTimeoutMS: 5000
  }).asPromise().then(function (respon) {
    return logger.info(respon.readyState);
  });
}; // const connection = await mongoose
//   .createConnection(config.get("db"), {
//     serverSelectionTimeoutMS: 5000,
//   })
//   .asPromise();
// debug(connection);
// if (connection.readyState === 1)
//   console.log("Successful Connection to Database");
// else console.error("Connection to database failed");