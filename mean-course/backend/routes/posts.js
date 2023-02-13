const express = require("express");
const Post = require("../models/post");

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    console.log(post);
    res
      .status(201)
      .json({ message: "Post Added Successfully!", postId: createdPost._id });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({
      message: "Posts updated successfully!",
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: "Posts doesn't exist!",
      });
    }
  });
});

//Manjul  DRwIygfwVH3dq3Ay
router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log("DELETED FROM MONGODB ");
    res.status(200).json({
      message: "Posts deleted successfully!",
    });
  });
});

module.exports = router;
