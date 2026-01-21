const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    port: 5434, // <--- Try 5432 first. If it fails, try 5433.
    dialect: "postgres",
    logging: false,
  },
);

module.exports = sequelize;
