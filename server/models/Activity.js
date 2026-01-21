const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Activity = sequelize.define("Activity", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: { type: DataTypes.STRING, allowNull: false },
  workspaceId: { type: DataTypes.UUID, allowNull: false },
});

module.exports = Activity;
