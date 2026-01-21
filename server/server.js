const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("CollabSpace API is running...");
});

// Sync Database and Start Server
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully");
    // ONLY start the server here
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
