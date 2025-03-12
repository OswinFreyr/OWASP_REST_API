const { DataTypes } = require('sequelize');

const { db } = require("./db");
const { DataTypes } = require("sequelize")

const BlacklistedToken = db.define("blacklistedToken", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false, // Store expiry date for automatic cleanup
  },
}, {

});

module.exports = { BlacklistedToken };