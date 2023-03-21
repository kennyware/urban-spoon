const mongoose = require("mongoose");
const Board = require("./boardsModel");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Please provide a username."] },
    email: {
      type: String,
      required: [true, "Please provide a email."],
      unique: true,
    },
    password: { type: String, required: [true, "Please provide a password."] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
