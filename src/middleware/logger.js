"use strict";

var c = require("config");

var logger = function logger(req, res, next) {
  console.log("Logging ...");
  next();
};

module.exports = logger;