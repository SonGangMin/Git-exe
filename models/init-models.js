var DataTypes = require("sequelize").DataTypes;
var _boards = require("./boards");
var _users = require("./users");

function initModels(sequelize) {
  var boards = _boards(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    boards,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
