const express = require("express");
const router = express.Router();
const {
  updateTask,
  addTask,
  deleteTask,
  addBoard,
  getBoards,
  deleteBoard,
  updateBoard,
  getBoard,
} = require("../controllers/tasksController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addTask);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
