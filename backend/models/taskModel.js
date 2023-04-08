const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  board: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Board" },
  title: { type: String, required: [true, "Please add a title field."] },
  description: { type: String, default: "" },
  status: { type: String, required: [true, "Please add a status field."] },
  subtasks: [{ title: String, isCompleted: Boolean }],
});

module.exports = mongoose.model("Task", taskSchema);
