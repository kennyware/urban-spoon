const express = require("express");
const router = express.Router();
const { addUser, loginUser, getMe } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", addUser);
router.get("/me", protect, getMe);
router.post("/login", loginUser);

module.exports = router;
