const express = require("express");
const router = express.Router();
const workspaceController = require("../controllers/workspaceController");
const protect = require("../middleware/authMiddleware");

router.get("/my-workspaces", protect, workspaceController.getUserWorkspaces);

router.post("/create", protect, workspaceController.createWorkspace);
router.post("/join", protect, workspaceController.joinWorkspace);

module.exports = router;
