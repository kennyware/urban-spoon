const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Add User
// @route POST /api/users

const addUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Please provide a email field.");
  }
  if (!password) {
    res.status(400);
    throw new Error("Please provide a password field.");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(req.body.password, salt);

  try {
    const response = await User.create({
      email,
      password: hashedPwd,
    });

    if (response) {
      return res.status(200).json({
        _id: response._id,
        email: response.email,
        token: generateJwt(response._id),
      });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const getMe = asyncHandler(async (req, res) => {
  const { _id, email } = await User.findById(req.user.id);

  return res.json({
    id: _id,
    email,
  });
});

// @desc Login User
// @route POST /api/users/login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide a email field.");
  }

  if (!password) {
    res.status(400);
    throw new Error("Please provide a password field.");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
      _id: user._id,
      email: user.email,
      token: generateJwt(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials.");
  }
});

const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { addUser, loginUser, getMe };
