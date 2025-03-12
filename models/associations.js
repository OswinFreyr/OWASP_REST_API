const { Dresseur } = require("./dresseurs");
const { Pokemon } = require("./pokemons");

Dresseur.hasMany(Pokemon);
Pokemon.belongsTo(Dresseur);

module.exports = { Dresseur, Pokemon, };