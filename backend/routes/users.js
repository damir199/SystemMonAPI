const express = require("express");

const User = require("../models/user");

const router = express.Router();

const auth = () => {
    return (req, res, next) => {
        next()
    }
}

router.post("", auth(), (req, res) => {
  const user = new User({
    title: req.body.title,
    content: req.body.content
  });
  user.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});


router.get("", (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: "users fetched successfully!",
      users: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
