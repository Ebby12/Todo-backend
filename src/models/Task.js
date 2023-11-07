const { Sequelize, db, DataTypes } = require("../../db/connection");

const Task = db.define("task", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  status: DataTypes.STRING,
});

module.exports = Task;
