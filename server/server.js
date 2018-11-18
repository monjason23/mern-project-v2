var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var cors = require("cors");

var authRoute = require("./routes/auth");
var userRoute = require("./routes/user");
var path = require("path");
var port = process.env.PORT || 4800;

//Database

var mongoose = require("./db/mongoose");

//Config
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("buildiing")));

  app.get("*", function(req, res) {
    res.sendFile(path.join("buildiing", "index.html"));
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());

//Passport
require("./passport.config");

//Routes
app.get("/", function(req, res) {
  res.send("You are now connected!");
});

app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);
app.use("/auth", authRoute);

app.listen(port, function() {
  console.log("Server running at port " + port);
});
