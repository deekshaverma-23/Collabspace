const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary");
const protect = require("../middleware/authMiddleware");

router.post("/upload", protect, upload.single("file"), (req, res) => {
  try {
    // Multer-cloudinary adds the file URL to req.file.path
    res.json({ url: req.file.path, name: req.file.originalname });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
