const passport = require("passport");

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const LocalStrategy = require("passport-local").Strategy;

const { User } = require("./models/User.model");

const SECRET_KEY = "socialmedia101";

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findByCredentials(username, password)
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(null, false, { error: err });
      });
  })
);

var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

passport.use(
  new JWTStrategy(opts, function(jwt_payload, done) {
    User.findOne({ _id: jwt_payload._id }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(null, false, { error: err }));
});
