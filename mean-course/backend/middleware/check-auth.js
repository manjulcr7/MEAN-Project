const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "long_secret_or_private_key");
    next();
  } catch (err) {
    res.status(401).json("Auth Failed");
  }
};
