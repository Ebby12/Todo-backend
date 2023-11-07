const { Sequelize, db } = require("../../db/connection");

let User = db.define("user", {
  username: Sequelize.STRING,
  role: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = User;
