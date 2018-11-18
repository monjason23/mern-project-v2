const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    minlength: 1,
    required: true
  },
  username: {
    type: String,
    unique: true,
    minlength: 8,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

UserSchema.pre("save", function(next) {
  let user = this;

  if (user.isModified("password")) {
    return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);

      return bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else return next();
});

UserSchema.statics.findByCredentials = function(username, password) {
  let User = this;

  return User.findOne({ username }).then(user => {
    if (!user) return Promise.reject();

    return bcrypt
      .compare(password, user.password)
      .then(result => {
        if (result) return user;
        else throw error("No user");
      })
      .catch(err => console.log(err));
  });
};

let User = mongoose.model("User", UserSchema);

module.exports = { User };
