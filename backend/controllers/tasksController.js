const asyncHandler = require("express-async-handler");

// @desc Get Tasks
// @route GET /api/tasks

const getTasks = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get tasks" });
});

// @desc Add Task
// @route POST /api/tasks

const addTask = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title field");
  }
  res.status(200).json({ message: "Add task" });
});

// @desc Update task
// @route PUT /api/tasks/:id

const updateTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update task ${req.params.id}` });
});

// @desc Delete Task
// @route DELETE /api/tasks/:id

const deleteTask = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete task ${req.params.id}` });
});

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
