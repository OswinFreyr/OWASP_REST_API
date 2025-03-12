const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Pokemon = db.define("pokemons", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    attack: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    defense: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {

});

module.exports = { Pokemon };