const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

// The ":workspaceId" MUST be here to catch that long ID from the frontend
router.get("/:workspaceId", protect, taskController.getTasks);
router.post("/", protect, taskController.createTask);
router.patch("/:id", protect, taskController.updateTask);

module.exports = router;
