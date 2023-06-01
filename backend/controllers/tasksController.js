const asyncHandler = require("express-async-handler");
const Board = require("../models/boardsModel");
const User = require("../models/userModel");
const Task = require("../models/taskModel");

// @desc Add Task
// @route POST /api/tasks/

const addTask = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title field");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  const board = await Board.findById(req.body.board);

  if (!board) {
    res.status(400);
    throw new Error("Board not found!");
  }

  const task = await Task.create({
    board: board._id,
    title: req.body.title,
    description: req.body.description ? req.body.description : "",
    status: req.body.status,
    subtasks: req.body.subtasks,
  });

  board.tasks.push(task._id);
  await board.save();

  return res.status(200).json(task);
});

// @desc Update task
// @route PUT /api/tasks/:id

const updateTask = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const task = await Task.findById(id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found!");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // Change fields based on what fields are recieved

  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      const element = req.body[key];
      task[key] = element;
    }
  }

  const updatedTask = await task.save();

  return res.json(updatedTask);
});

// @desc Delete Task
// @route DELETE /api/tasks/:id

const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  const task = await Task.findById(taskId);

  const board = await Board.findById(task.board);

  if (!board) {
    res.status(400);
    throw new Error("Board not found!");
  }

  if (!task) {
    res.status(400);
    throw new Error("Task not found!");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  if (board.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  await Task.findByIdAndDelete(taskId);

  await board.updateOne({
    $pull: {
      tasks: taskId,
    },
  });

  return res.status(200).json({ success: true, deleted: taskId });
});

// @desc Add Board
// @route POST /api/boards

const addBoard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }

  const board = await Board.create({
    user: req.user._id,
    name: req.body.name,
  });

  return res.status(200).json(board);
});

// @desc Get Boards
// @route GET /api/boards

const getBoards = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  const boards = await Board.find({ user: req.user._id });
  return res.status(200).json(boards);
});

// @desc Get Board
// @route GET /api/boards/:id

const getBoard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  const board = await Board.findById(req.params.id).populate("tasks");
  return res.status(200).json(board);
});

// @desc Update Board
// @route UPDATE /api/boards/:id

const updateBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(400);
    throw new Error("Board not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  if (board.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json(updatedBoard);
});

// @desc Delete Board
// @route DELETE /api/boards/:id

const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(400);
    throw new Error("Board not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  if (board.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  await Task.deleteMany({ board: req.params.id });

  await Board.findByIdAndDelete(req.params.id);
  return res.status(200).json({ success: true });
});

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  addBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard,
};
