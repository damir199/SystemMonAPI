const express = require("express");

const User = require("../models/user");

const router = express.Router();

router.get("", (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      users: documents
    });
  });
});

//DO NOT NEED THIS CURRENTLY
/*
router.post("", (req, res, next) => {
  console.log(req.body.email);
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then(createdUser => {
    res.status(201).json({
      userid: createdUser._id
    });
  });
});*/
module.exports = router;