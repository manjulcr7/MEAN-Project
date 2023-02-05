const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({ message: "Post Added Successfully!" });
  next();
});

app.get("/api/posts", (req, res, next) => {
  var posts = [
    {
      id: "faweo322",
      title: "First post from backend",
      content: "This is from the backend nodejs",
    },
    {
      id: "fawe3422",
      title: "Second post from backend",
      content: "This is also from the backend nodejs",
    },
  ];

  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
  });
});

module.exports = app;
