const config = require("config");
const winston = require("winston");
const CustomError = require("../interfaces/http/errors/errorResponse");
require("express-async-errors");
require("winston-mongodb");

module.exports = (app) => {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.File({
        filename: "error.log",
        level: "error",
        format: format.json(),
      }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
    app.use(morgan("combined"));
    logger.info("Morgan Enabled");
  }

  process.on("unhandledRejection", (error) => {
    new CustomError(500, error.message);
  });

  logger.exceptions.handle(
    new transports.Console({
      level: "info",
      format: format.combine(format.simple(), format.colorize()),
    }),
    new transports.File({ filename: "uncaught.log" })
  );

  // ? Throwing unhandled rejections to uncaught errors
  logger.rejections.handle(
    new transports.Console({
      level: "info",
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({
      filename: "uncaught.log",
      level: "error",
      format: format.json(),
    })
  );

  const options = {
    useUnifiedTopology: true,
    db: config.get("database_url"),
    level: "info",
    name: "logs",
    collection: "logs",
    includeIds: true,
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  };
  logger.add(new winston.transports.MongoDB(options));

  return logger;
};
