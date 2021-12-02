const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const GenreRoutes = require("../routes/genre");
const CustomerRoutes = require("../routes/customer");
const MovieRoutes = require("../routes/movie");
const RentalRoutes = require("../routes/rental");
const UserRoutes = require("../routes/user");
const AuthRoutes = require("../routes/auth");
const Index = require("../routes");
const error = require("../middleware/error");

const whitelist = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = function (app) {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(helmet());
  app.use(express.static("public"));
  app.use("/", Index);
  app.use("/api/genres", GenreRoutes);
  app.use("/api/movies", MovieRoutes);
  app.use("/api/rentals", RentalRoutes);
  app.use("/api/customers", CustomerRoutes);
  app.use("/api/users", UserRoutes);
  app.use("/api/auth", AuthRoutes);
  app.use(error);
};
