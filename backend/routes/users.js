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
  let fetchedUser;
  //first check the email is valid
  User.findOne({email: req.body.email}).then(user => {
    if(!user){
      //failure if no email
      return res.status(401).json({
        message: "Auth Failed 1 'Email doesnt match'"
      });
    }
    fetchedUser = user;
    //if user exists, compare the hashed passwords
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    //if password hashes dont match return error
    if(!result){
      return res.status(401).json({
        message: "Auth Failed 2 'Password hash mismatch'"
      });
    }
    //create jwt web token
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 
      "this_should_be_a_LONG_Sercret", 
      {
      expiresIn: "1h"
      });
    res.status(200).json({
      token: token
    });

  })
  .catch(err =>{
    console.log(err)
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