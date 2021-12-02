"use strict";

var configurations = require('../../../containers/config');

var config = require('config');

var express = require('express');

var app;
describe("Configurations", function () {
  beforeEach(function () {
    return app = express();
  });
  it("throws an error is mail.password is not defined", function () {
    configurations(app);

    if (!config.get("vividly_jwtkey")) {
      throw new Error("FATAL ERROR: JWTKEY is not defined");
    }
  });
  it("throws an erro if mail.password is not define", function () {
    if (!config.get("mail.password")) {
      throw new Error("FATAL ERROR: Mail Password is not defined");
    }
  });
  it("throws an erro if mail.password is not define", function () {
    if (app.get("env") === "development") {
      app.use(morgan("tiny"));
      debug("Morgan Enabled");
    }
  });
});