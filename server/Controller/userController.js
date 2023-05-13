const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const generateToken = require("../config/generateToken");
const { json } = require("express");

// const allUsers = asyncHandler(async (req, res) => {
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};

//   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
//   res.send(users);
// });

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        user,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    res.status(403).json({
      status: "Fail",
      message: "Email is already exist",
      error: err.message,
    });
  }
};

exports.authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        user,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: "Invalid credential",
      error: err.message,
    });
  }
});
