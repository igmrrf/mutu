"use strict";

var express = require("express");

var helmet = require("helmet");

var cors = require("cors");

var GenreRoutes = require("../routes/genre");

var CustomerRoutes = require("../routes/customer");

var MovieRoutes = require("../routes/movie");

var RentalRoutes = require("../routes/rental");

var UserRoutes = require("../routes/user");

var AuthRoutes = require("../routes/auth");

var Index = require("../routes");

var error = require("../middleware/error");

var whitelist = ["http://localhost:3000", "http://localhost:3001"];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

module.exports = function (app) {
  app.use(express.urlencoded({
    extended: false
  }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(express["static"]("public"));
  app.use("/", Index);
  app.use("/api/genres", GenreRoutes);
  app.use("/api/movies", MovieRoutes);
  app.use("/api/rentals", RentalRoutes);
  app.use("/api/customers", CustomerRoutes);
  app.use("/api/users", UserRoutes);
  app.use("/api/auth", AuthRoutes);
  app.use(error);
};