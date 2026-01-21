const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Workspace = sequelize.define("Workspace", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  inviteCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Workspace;
