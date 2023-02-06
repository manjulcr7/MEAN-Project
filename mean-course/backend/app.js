const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const Post = require("./models/post");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Manjul:DRwIygfwVH3dq3Ay@cluster0.ovyrg4j.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MONGODB Connected!");
  })
  .catch(() => {
    console.log("MONGODB Failed to Connect!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST,PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
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

//Manjul  DRwIygfwVH3dq3Ay
app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((res) => {
    console.log("DELETED FROM MONGODB ");
    res.status(200).json({
      message: "Posts deleted successfully!",
    });
  });
});
module.exports = app;
