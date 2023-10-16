const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("node-db", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
