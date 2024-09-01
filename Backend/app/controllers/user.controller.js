const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Username, email, and password are required!",
    });
    return;
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  const user = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contactNumber: req.body.contactNumber,
    preferences: req.body.preferences,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI1MTY1NjI5LCJleHAiOjE3MjUyNTIwMjl9.sEI6u2B_D69yUYjxQbSAc1PrieI1mmE3aw2uWhNuCN0

// {
//   "email": "testuser@example.com",
//   "password": "password123"
// }
exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Email and password are required!",
    });
  }

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found.",
        });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 86400,
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred during login.",
      });
    });
};
