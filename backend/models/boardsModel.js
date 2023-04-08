const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: [true, "Please provide a name."] },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Board", boardSchema);
