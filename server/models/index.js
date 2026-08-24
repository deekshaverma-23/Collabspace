const User = require("./User");
const Workspace = require("./Workspace");
const Task = require("./Task");
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const WorkspaceMember = sequelize.define("WorkspaceMember", {
  role: {
    type: DataTypes.ENUM("Admin", "Member", "Viewer"),
    defaultValue: "Member",
  },
});

User.belongsToMany(Workspace, { through: WorkspaceMember });
Workspace.belongsToMany(User, { through: WorkspaceMember });

Workspace.hasMany(Task, { foreignKey: "workspaceId", onDelete: "CASCADE" });
Task.belongsTo(Workspace, { foreignKey: "workspaceId" });

module.exports = {
  sequelize,
  User,
  Workspace,
  WorkspaceMember,
  Task,
};
