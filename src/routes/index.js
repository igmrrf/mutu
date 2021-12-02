"use strict";

var router = require("express").Router();

router.get("/", function (req, res) {
  res.render("index", {
    title: "My Express App",
    message: "You have successfully reached the Vidly Endpoint"
  });
});
module.exports = router;