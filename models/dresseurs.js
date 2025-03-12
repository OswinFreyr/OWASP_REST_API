const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Dresseur = db.define("dresseurs", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secret: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {

});

module.exports = { Dresseur };