const User = require("./User");
const Workspace = require("./Workspace");
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
User.belongsToMany(Workspace, { through: "WorkspaceMember" });
Workspace.belongsToMany(User, { through: "WorkspaceMember" });

// Export everything
module.exports = {
  sequelize,
  User,
  Workspace,
  WorkspaceMember,
};
