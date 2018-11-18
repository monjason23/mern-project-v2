const mongoose = require("mongoose");
let mongoURI = "mongodb://localhost:27017/MyApp";

if (process.env.NODE_ENV === "production") {
  mongoURI = process.env.MONGO_URI;
}

mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);

module.exports = mongoose;
