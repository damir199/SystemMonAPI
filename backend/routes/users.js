const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.get("", (req, res, next) => {
  User.find().then(documents => {
    console.log(documents)
    res.status(200).json({
      
      message: "Posts fetched successfully!",
      users: documents
    });
  });
});

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
  const user = new User({
    email: req.body.email,
    password: hash
  });
  user.save()
  .then(result => {
    res.status(201).json({
      message: 'user created',
      result: result
    });
  })
    .catch(err => {
      res.status(500).json({
        message: 'failed',
        error: err
      });
    });
  });
});

 



router.post("/login", (req, res, next) => {
  
  User.findOne({email: req.body.email}).then(user => {
    if(!user){
      return res.status(401).json({
        message: "Auth Failed 1"
      })
    }
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if(!result){
      return res.status(401).json({
        message: "Auth Failed 2 "
      });
    }
    const token =jwt.sign({email: user.email, userID: user._id}, "this_should_be_a_LONG_Sercret", {
      expiresIn: "1h"
    });
    res.status(200).json({
      token: token
    });

  })
  .catch(err =>{
    return res.status(401).json({
      message: "Auth Failed 3"
    });
  })

})

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