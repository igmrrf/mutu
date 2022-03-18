require("dotenv").config();
const express = require("express");
const config = require("config");
const CustomError = require("../interfaces/http/errors/errorResponse");
require("express-async-errors");

const app = express();

if (!config.has("default_env")) new CustomError(500, "Environmental Variables Not Loaded");

const logger = require("./logger")(app);
require("./loaders/database")(logger);
require("./routes")(app, logger);

const PORT = config.get("port") || 8080;

const server = app.listen(PORT, () => logger.info(`Server running on Port ${PORT}`));

module.exports = server;
