const express = require("express");
const routes = require("./routes/posts");

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

app.use("/api/posts",routes);

module.exports = app;
