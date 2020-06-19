const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const helper = require("./auth-model");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (credentials.name && isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;

    helper
      .addUser(credentials)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Database error" });
      });
  } else {
    res.status(400).json({
      message:
        "Please include name, email and password, with password being alphanumeric"
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (isValid(req.body)) {
    helper.findBy(email).then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Successfully logged in", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } else {
    res.status(400).json({
      message:
        "Please include email and password, with password being alphanumeric"
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    name: user.name,
    email: user.email
  };

  const options = {
    expiresIn: "2h"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

function isValid(user) {
  return Boolean(
    user.email && user.password && typeof user.password === "string"
  );
}

module.exports = router;
