const { User } = require("./users");
const { Pokemon } = require("./pokemons");

User.hasMany(Pokemon);
Pokemon.belongsTo(User);

module.exports = { User, Pokemon, };