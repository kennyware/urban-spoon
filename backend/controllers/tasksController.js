const asyncHandler = require("express-async-handler");
const Board = require("../models/boardsModel");
const User = require("../models/userModel");

// @desc Get Tasks
// @route GET /api/boards/:id/tasks

const getTasks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  try {
    const tasks = await Board.findOne({
      user: user.id,
      id: req.params.id,
    }).select("tasks");
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

// @desc Add Task
// @route POST /api/boards/:id/tasks

const addTask = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title field");
  }

  const board = await Board.findById(req.params.id);

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  if (board.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  const task = {
    title: req.body.title,
    description: req.body.description ? req.body.description : "",
    status: req.body.status,
    subtasks: req.body.subtasks,
  };

  board.tasks.push(task);
  const updated = await board.save();

  return res.status(200).json({ updated });
});

// @desc Update task
// @route PUT /api/boards/:id/tasks?taskId

const updateTask = asyncHandler(async (req, res) => {
  const boardId = req.params.id;
  const taskId = req.query.taskId;

  const board = await Board.findById(boardId);
  const task = board.tasks.id(taskId);

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

  // Change fields based on what fields are recieved

  for (const key in req.body) {
    if (Object.hasOwnProperty.call(req.body, key)) {
      const element = req.body[key];
      task[key] = element;
    }
  }

  const updated = await board.save();

  return res.json(updated);
});

// @desc Delete Task
// @route DELETE /api/boards/:id/tasks?taskId

const deleteTask = asyncHandler(async (req, res) => {
  const boardId = req.params.id;
  const taskId = req.query.taskId;

  const board = await Board.findById(boardId);
  const task = board.tasks.id(taskId);

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

  await board.updateOne({
    $pull: {
      tasks: {
        _id: taskId,
      },
    },
  });

  res.status(200).json({ success: true, deleted: taskId });
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

  const board = await Board.create({ user: req.user._id, name: req.body.name });
  return res.status(200).json({ response: board });
});

// @desc Get Boards
// @route GET /api/boards

const getBoards = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  try {
    const boards = await Board.find({ user: req.user._id });
    return res.status(200).json({ response: boards });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
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

  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(updatedBoard);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
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
  try {
    await board.remove();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  addBoard,
  getBoards,
  updateBoard,
  deleteBoard,
};
