const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  creatorUsername: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    minlength: 10,
    trim: true
  }
});

let Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
