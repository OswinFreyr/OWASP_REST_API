

app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const dresseur = Dresseur.find(d => d.name === dresseurname);

    if (!dresseur || !bcrypt.compareSync(password, dresseur.password)) {
        return res.status(401).json({ message: 'Identifiants invalides' });
    }

    req.session.dresseurId = dresseur.id;
    res.json({ message: 'Connexion réussie' });
});
const express = require("express");
const router = express.Router()

const dresseurController = require("../controllers/dresseurController");

router.post("/dresseurs/login", dresseurController.loginDresseur);
router.post("/dresseurs/createDresseur", dresseurController.createDresseur);

module.exports = router
