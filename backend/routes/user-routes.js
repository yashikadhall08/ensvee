const express = require("express");
const User = require("../models/user");
const authVerify = require("../middleware/auth");
const config = require("../config/auth.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const axios = require("axios");

const app = express();
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    let findUser = await User.findOne({ username: req.body.username });
    console.log(req.body.password);

    if (!findUser) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      console.log("in");
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      newUser.save((err, newUser) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.send({ message: "User was registered successfully!" });
        }
      });
    } else {
      res.send({ message: "username already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post("/login", async (req, res, next) => {
  let { username, email, password } = req.body;
  User.findOne({ email: email }).exec((err, user) => {
    console.log("in");
    if (err) {
      console.log(err);
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      console.log("pass")
      return res.send({
        accessToken: null,
        message: "Invalid Password!",
      });
    } 

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 500,
    });

    res.send({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      accessToken: token,
      message: "Verified",
    });
  });
});

router.get("/getUser", authenticateToken, async (req, res) => {
  try {
    let user = await User.findOne({ id: req.user.id });
    console.log(user);
    console.log(req.user);
    if (!user) {
      res.json({ message: "no such user found" });
      return;
    } else {
      res.json({ user: user });
      res.status(201).send(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get("/logout", authenticateToken, async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    console.log("logout");
    await req.user.save();
    res.redirect("/login");
    return;
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

function authenticateToken(req, res, next) {
  console.log(req.headers["authorization"]);
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  //localStorage.setItem("SavedToken", 'Bearer ' + token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.secret, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
