const dresseurService = require("../services/dresseurService");

async function createDresseur(req, res) {
    try {
        const dresseur = await dresseurService.createDresseur(req.body);
        res.json(dresseur);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getDresseurById(req, res) {
    try {
        const id = req.query.id;
        const dresseur = await dresseurService.getDresseurById(id);
        if(dresseur){
            res.json(dresseur);
        }
        else {
            res.json({"error": `Dresseur ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllDresseurs(req, res) {
    try{
        const {name } = req.query;
        const dresseurs = await dresseurService.getAllDresseurs({ name });
        res.json(dresseurs);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};


async function addPokemonToDresseur(req, res){
    try {
        const idDresseur = req.query.idDresseur;
        const idPokemon = req.query.idPokemon;
        const pokemonDresseur = await dresseurService.addPokemonToDresseur(idPokemon,idDresseur);
        res.json({ PokemonDresseur: pokemonDresseur, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function updateDresseur (req, res){
    try {
        const idDresseur = req.query.idDresseur;
        const dresseur = await dresseurService.updateDresseur(idDresseur, req.body);
        res.json(dresseur);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteDresseur (req, res){
    try {
        const idDresseur = req.query.idDresseur;
        const dresseur = await dresseurService.deleteDresseur(idDresseur);
        res.json(dresseur);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createDresseur, getDresseurById, getAllDresseurs, addPokemonToDresseur, updateDresseur, deleteDresseur }