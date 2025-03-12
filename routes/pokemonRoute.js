const express = require("express");
const router = express.Router()

const pokemonController = require("../controllers/pokemonController");

router.get("/", pokemonController.getAllPokemons);
router.get("/limit", pokemonController.getLimitedPokemons);
router.get("/id", pokemonController.getPokemonById);

router.post("/", pokemonController.createPokemon);
router.post("/dresseurPokemon", pokemonController.addDresseurToPokemon);

router.patch("/update", pokemonController.updatePokemon);

router.delete("/delete", pokemonController.deletePokemon)

module.exports = router;