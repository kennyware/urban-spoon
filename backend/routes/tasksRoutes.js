const express = require("express");
const router = express.Router();
const {
  getTasks,
  updateTask,
  addTask,
  deleteTask,
} = require("../controllers/tasksController");

router.route("/").get(getTasks).post(addTask);

router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
