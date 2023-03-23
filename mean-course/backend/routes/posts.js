const express = require("express");
const multer = require("multer");

const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    var error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("_");
    const extension = MIME_TYPE[file.mimetype];
    cb(null, name + "_" + Date.now() + "." + extension);
  },
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: url + "/images/" + req.file.filename,
      creator: req.user.userId,
    });
    console.log(post);
    post.save().then((createdPost) => {
      console.log(post);
      res.status(201).json({
        message: "Post Added Successfully!",
        post: { ...createdPost, id: createdPost._id },
      });
    });
  }
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    var image = req.body.image;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      image = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      image: image,
      creator: req.user.userId,
    });
    Post.updateOne({ _id: req.params.id, creator: req.user.userId }, post).then(
      (result) => {
        if (result.modifiedCount > 0) {
          res.status(200).json({
            message: "Posts updated successfully!",
          });
        } else {
          res.status(401).json({
            message: "User not authorized!",
          });
        }
      }
    );
  }
);

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
router.get("", checkAuth, (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log("DELETED FROM MONGODB ");
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).json({
        message: "Posts updated successfully!",
      });
    } else {
      res.status(401).json({
        message: "User not authorized!",
      });
    }
    res.status(200).json({
      message: "Posts deleted successfully!",
    });
  });
});

module.exports = router;
