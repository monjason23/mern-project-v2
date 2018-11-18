const express = require("express");
const router = express.Router();
const moment = require("moment");

const { Post } = require("../models/Post.model");

router.get("/", function(req, res) {
  res.send(req.user);
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("/posts", function(req, res) {
  Post.find({
    creatorId: req.user._id
  })
    .then(posts => res.send(posts))
    .catch(err => res.status(401).send({ error: err }));
});

router.post("/create/post", function(req, res) {
  let newPost = new Post({
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    creatorId: req.user._id,
    creatorUsername: req.user.username,
    content: req.body.content
  });

  newPost
    .save()
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(401).send({ error: err }));
});

router.patch("/update/post", function(req, res) {
  Post.findByIdAndUpdate(
    {
      _id: req.body.id,
      creatorId: req.body._id
    },
    {
      $set: { content: req.body.content }
    },
    {
      new: true
    }
  )
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(401).send({ error: err }));
});

module.exports = router;
