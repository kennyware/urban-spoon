const express = require("express");
const router = express.Router();
const {
  getTasks,
  updateTask,
  addTask,
  deleteTask,
  addBoard,
  getBoards,
  deleteBoard,
  updateBoard,
} = require("../controllers/tasksController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:id/tasks").get(protect, getTasks).post(protect, addTask);
router.route("/").get(protect, getBoards).post(protect, addBoard);
router.route("/:id").delete(protect, deleteBoard).put(protect, updateBoard);

router.route("/:id/tasks").put(updateTask).delete(deleteTask);

module.exports = router;
