const express = require("express");

const Device = require("../models/device");

const router = express.Router();

router.post("", (req, res, next) => {
  const device = new Device({
    title: req.body.title,
    content: req.body.content
  });
  device.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const device = new Device({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Device.updateOne({ _id: req.params.id }, device).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("", (req, res, next) => {
  Device.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      devices: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Device.findById(req.params.id).then(device => {
    if (device) {
      res.status(200).json(device);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Device.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
