const express = require("express");

const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/user.model");
const { BlackListUserModel } = require("../models/blacklistUser.model");

require("dotenv").config();

// SingUP Router
// UserRouter.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;

//   const existUser = await UserModel.findOne({ email });
//   if (existUser) return res.status(400).json({ message: "user already exists" });

//   try {
//     bcrypt.hash(password, 5, async (err, hash) => {
//       if (err) {
//         res.status(200).json({ msg: "wrong Password" });
//       } else {
//         const user = new UserModel({
//           username: username,
//           email: email,
//           password: hash,
//         });
//         await user.save();
//         res.status(200).json({ msg: "user registered successfully" });
//       }
//     });
//   } catch (error) {
//     res.status(400).json({ msg: "unable to register user" });
//   }
// });

//-----------------------------------------------------------------
// UserRouter.post("/register", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const existUser = await UserModel.findOne({ email });
//     if (existUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hash = await bcrypt.hash(password, 5);
//     const user = new UserModel({
//       username: username,
//       email: email,
//       password: hash,
//     });
//     await user.save();
//     res.status(200).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Unable to register user" });
//   }
// });
//--------------------mine----------------------------------

UserRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const findUser = await UserModel.findOne({ email });
    if (findUser) {
      res.status(200).json({ msg: "User Already registered" });
    } else {
      bcrypt.hash(password, 5, (err, hash) => {
        if (!err) {
          const user = new UserModel({
            username,
            email,
            password: hash,
          });
          user.save();
          res.status(200).json({ msg: "User added successfully" });
        } else {
          res.status(400).json({ msg: err });
        }
      });
    }
  } catch (err) {}
});

//-----------------------------------------------------------------

// Login Router
// UserRouter.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await UserModel.findOne({ email: email });
//     if (user) {
//       bcrypt.compare(password, user.password, (err, decode) => {
//         if (decode) {
//           res
//             .status(200)
//             .json({
//               msg: "user succesefully logged-in",
//               token: jwt.sign({ user }, process.env.SECRET_KEY),
//             });

//         } else {
//           res.status(200).json({ msg: "incorrect password" });
//         }
//       });
//     }
//   } catch (error) {
//     res.status(400).json({ msg: "login failed" });
//   }
// });
//--------------------------------------------------------
UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }
      if (!result) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.status(200).json({
        message: "User successfully logged in",
        token: token,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

//-------------------------------------------------------

//Logout Router
// UserRouter.post("/logout", async (req, res) => {
//   try {
//     // Extract the token from the request header
//     const token = req.header("Authorization").replace("Bearer ", "");


//     // Verify the token
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);


//     // Blacklist the token
//     await BlackListUserModel.create({ token });

//     res.status(200).json({ msg: "User successfully logged out" });
//   } catch (error) {
//     res.status(500).json({ msg: "Logout failed" });
//   }
// });
//-----------------------------------------------------------------
UserRouter.post("/logout", async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    await BlackListUserModel.create({ token });

    res.status(200).json({ message: "User successfully logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed" });
  }
});

//-----------------------------------------------------------------
module.exports = {
  UserRouter
}
