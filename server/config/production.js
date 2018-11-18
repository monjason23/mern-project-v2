var path = require("path");
var express = require("express");

module.exports = function(app) {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")));

    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "build", "index.html"));
    });
  }
};
