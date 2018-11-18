const express = require("express");
const router = express.Router();

const { User } = require("../models/User.model");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const SECRET_KEY = "socialmedia101";

router.post("/create/user", function(req, res) {
  let newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  newUser
    .save()
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => res.status(400).send({ error: err }));
});

router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, function(err, user, info) {
    if (err || !user) {
      return next(err);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      const token = jwt.sign(user.toJSON(), SECRET_KEY, {
        expiresIn: "1d"
      });
      req.user = user;
      return res.send({ user, token });
    });
  })(req, res, next);
});

module.exports = router;
