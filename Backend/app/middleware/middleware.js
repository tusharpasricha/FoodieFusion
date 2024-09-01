const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

const authJwt = {};

authJwt.verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = authJwt;
