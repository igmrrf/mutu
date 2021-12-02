"use strict";

require("dotenv").config();

var configurations = {
  port: process.env.PORT || 5000,
  jwt: process.env.JWT_SECRET_KEY
};
module.exports = configurations;