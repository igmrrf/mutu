require("dotenv").config();
const express = require("express");
const app = express();

const logger = require("./containers/logging");

require("./containers/database")(logger);
require("./containers/routes")(app);
require("./containers/config")(app);
require("./containers/validate")();

app.set("view engine", "pug");
app.set("views", "./views");

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  logger.info(
    `Server is running on port ${PORT} and on ${app.get("env")} grounds`
  )
);

module.exports = server;
