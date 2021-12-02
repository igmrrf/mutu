"use strict";

var _require = require("winston"),
    format = _require.format,
    transports = _require.transports,
    exceptions = _require.exceptions,
    createLogger = _require.createLogger; // require("winston-mongodb");


require("express-async-errors"); // ? Configuring winston to handle uncaught errors


var logger = createLogger({
  level: "info",
  format: format.combine(format.simple(), format.colorize()),
  defaultMeta: {
    service: "user-service"
  },
  transports: [new transports.File({
    filename: "error.log",
    level: "error",
    format: format.json()
  }), new transports.Console(), new transports.File({
    filename: "combined.log"
  })]
});
logger.exceptions.handle(new transports.Console({
  level: "info",
  format: format.combine(format.simple(), format.colorize())
}), new transports.File({
  filename: "uncaught.log"
})); // ? Throwing unhandled rejections to uncaught errors

logger.rejections.handle(new transports.Console({
  level: "info",
  format: format.combine(format.colorize(), format.simple())
}), new transports.File({
  filename: "uncaught.log",
  level: "error",
  format: format.json()
})); // ? Setting up winston
// add(transports.File, { filename: "logfile.log" });
//   add(transports.MongoDB, {
//     db: "mongodb://localhost/playground",
//     level: "info"
//   });

module.exports = logger;