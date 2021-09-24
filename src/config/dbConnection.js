const debug = require("debug")("dbConnection");
const { sequelize } = require("../models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    debug(error);
  }
})();
