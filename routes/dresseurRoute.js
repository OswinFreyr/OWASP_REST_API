const express = require("express");
const router = express.Router()

const dresseurController = require("../controllers/dresseurController");

router.get("/", dresseurController.getAllDresseurs);
router.get("/limit", dresseurController.getLimitedDresseurs);
router.get("/id", dresseurController.getDresseurById);

router.post("/", dresseurController.createDresseur);
router.post("/pokemonDresseur", dresseurController.addPokemonToDresseur);

router.patch("/update", dresseurController.updateDresseur);

router.delete("/delete", dresseurController.deleteDresseur)

module.exports = router;