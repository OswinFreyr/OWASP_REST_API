const express = require("express");
const router = express.Router()

const dresseurController = require("../controllers/dresseurController");

router.post("/dresseurs/login", dresseurController.loginDresseur);
router.post("/dresseurs/createDresseur", dresseurController.createDresseur);

module.exports = router