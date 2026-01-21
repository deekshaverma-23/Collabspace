const User = require("./User");
const Workspace = require("./Workspace");
const Task = require("./Task"); // 1. IMPORT THE TASK MODEL
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Pivot Table for Many-to-Many
const WorkspaceMember = sequelize.define("WorkspaceMember", {
  role: {
    type: DataTypes.ENUM("Admin", "Member", "Viewer"),
    defaultValue: "Member",
  },
});

// Relationships
User.belongsToMany(Workspace, { through: WorkspaceMember });
Workspace.belongsToMany(User, { through: WorkspaceMember });

// 2. ADD TASK RELATIONSHIPS
Workspace.hasMany(Task, { foreignKey: "workspaceId", onDelete: "CASCADE" });
Task.belongsTo(Workspace, { foreignKey: "workspaceId" });

// 3. EXPORT EVERYTHING - This is the part that fixes the 'undefined' error
module.exports = {
  sequelize,
  User,
  Workspace,
  WorkspaceMember,
  Task, // If this is missing, the controller crashes!
};
