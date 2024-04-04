const express = require("express");

const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/user.model");
const { BlackListUserModel } = require("../models/blacklistUser.model");

require("dotenv").config();

// SingUP Router
UserRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const existUser = await UserModel.findOne({ email });
  if (existUser) return res.status(400).json({ message: "User already exists" });

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(200).json({ msg: "Your Password is not secure" });
      } else {
        const user = new UserModel({
          username: username,
          email: email,
          password: hash,
        });
        await user.save();
        res.status(200).json({ msg: "user registered successfully" });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: "Error: unable to register user" });
  }
});

// Login Router
UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, decode) => {
        if (decode) {
          res
            .status(200)
            .json({
              msg: "User succesefully login",
              token: jwt.sign({ user }, process.env.SECRET_KEY),
            });

        } else {
          res.status(200).json({ msg: "Incorrect Password" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ msg: "Login Failed" });
  }
});


//Logout Router
UserRouter.post("/logout", async (req, res) => {
  try {
    // Extract the token from the request header
    const token = req.header("Authorization").replace("Bearer ", "");


    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);


    // Blacklist the token
    await BlackListUserModel.create({ token });

    res.status(200).json({ msg: "User successfully logged out" });
  } catch (error) {
    res.status(500).json({ msg: "Logout failed" });
  }
});

module.exports = {
  UserRouter
}
