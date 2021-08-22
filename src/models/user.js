const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("User", {
  nom_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postnom_user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type:DataTypes.STRING,
    allowNull: true,
  },
  password : {
    type:DataTypes.STRING,
    allowNull: false,
  }

});

module.exports = User;
