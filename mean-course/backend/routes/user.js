const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User singuped successfully!",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User doesn't exist!",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "User doesn't exist!",
        });
      }

      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "long_secret_or_private_key",
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        token: token,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        message: "User doesn't exist!",
      });
    });
});

module.exports = router;
