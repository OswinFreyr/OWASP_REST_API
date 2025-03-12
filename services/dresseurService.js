const { Dresseur, Pokemon } = require("../models/associations");


async function createDresseur(dresseur) {
    return await Dresseur.create(dresseur);
}

async function getDresseurById(id) {
    const dresseur = await Dresseur.findByPk(id, {
        include: [
            {model: Pokemon},
        ]
    });
    if (dresseur) {
        return dresseur.toJSON();
    }
    else {
        return null;
    }
}

async function getAllDresseurs(criterias = {}) {
    const where = {}
    if (criterias.name) {
        where.name = criterias.name;
    }
    const dresseurs = await Dresseur.findAll({
        where,
        include: [
            {model: Pokemon},
        ]
    });
    if(dresseurs) {
        return dresseurs;
    }
    else {
        return null;
    }
}

async function addPokemonToDresseur(idPokemon, dresseurId) {
    const dresseur = await Dresseur.findByPk(dresseurId);
    const isPokemon = await Pokemon.findByPk(idPokemon)
    if (isPokemon) {
        //verif si deja associé
        const isPokemonDresseur = await Dresseur.findAll({ where: { id: dresseurId }, include: { model: Pokemon, where: { id: idPokemon } } });
        if (isPokemonDresseur.lenght > 0) {
            return null;
        }
        else {
            return dresseur.addPokemon(idPokemon);
        }
    }
}

async function updateDresseur(dresseurId, updatedData) {
    const dresseur = await Dresseur.findByPk(dresseurId);
    if (dresseur) {
        return dresseur.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteDresseur(dresseurId) {
    const dresseur = await Dresseur.findByPk(dresseurId);
    if (dresseur) {
        return dresseur.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createDresseur, getDresseurById, getAllDresseurs, addPokemonToDresseur, updateDresseur, deleteDresseur }