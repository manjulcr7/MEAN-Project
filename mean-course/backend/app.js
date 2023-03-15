const express = require("express");
const path = require("path");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");


const mongoose = require("mongoose");

const bodyParser = require("body-parser");

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
app.use("/images", express.static(path.join("backend/images")));

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

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);


module.exports = app;
