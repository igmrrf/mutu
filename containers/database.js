const winston = require("winston");
const config = require("config");
const mongoose = require("mongoose");
console.log(config.has("db"));
module.exports = (logger) =>
  mongoose
    .createConnection(config.get("db"), { serverSelectionTimeoutMS: 5000 })
    .asPromise()
    .then((respon) => logger.info(respon.readyState));

// const connection = await mongoose
//   .createConnection(config.get("db"), {
//     serverSelectionTimeoutMS: 5000,
//   })
//   .asPromise();
// debug(connection);

// if (connection.readyState === 1)
//   console.log("Successful Connection to Database");
// else console.error("Connection to database failed");
