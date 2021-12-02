"use strict";

require("dotenv").config();

var express = require("express");

var app = express();

var logger = require("./containers/logging");

require("./containers/database")(logger);

require("./containers/routes")(app);

require("./containers/config")(app);

require("./containers/validate")();

app.set("view engine", "pug");
app.set("views", "./views");
var PORT = process.env.PORT;
var server = app.listen(PORT, function () {
  return logger.info("Server is running on port ".concat(PORT, " and on ").concat(app.get("env"), " grounds"));
});
module.exports = server;