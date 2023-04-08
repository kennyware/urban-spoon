const express = require("express");
const router = express.Router();
const {
  addBoard,
  getBoards,
  deleteBoard,
  updateBoard,
  getBoard,
} = require("../controllers/tasksController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getBoards).post(protect, addBoard);
router
  .route("/:id")
  .get(protect, getBoard)
  .delete(protect, deleteBoard)
  .put(protect, updateBoard);

module.exports = router;
