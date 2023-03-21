const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: [true, "Please add a title field."] },
  description: { type: String, default: "" },
  status: { type: String, required: [true, "Please add a status field."] },
  subtasks: [{ title: String, isCompleted: Boolean }],
});

const boardSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: [true, "Please provide a name."] },
  tasks: [taskSchema],
});

module.exports = mongoose.model("Board", boardSchema);
