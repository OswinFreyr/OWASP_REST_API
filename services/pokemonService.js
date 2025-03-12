const { Pokemon, Dresseur } = require("../models/associations");


async function createPokemon(pokemon) {
    return await Pokemon.create(pokemon);
}

async function createAssociatedPokemon(pokemonData) {
    const pokemon = await Pokemon.create({
        name: pokemonData.name,
        type: pokemonData.type,
        hp: pokemonData.hp,
        attack: pokemonData.attack,
        defense: pokemonData.defense,
        dresseurId: pokemonData.dresseurId
    });
    return pokemon;
}

async function getPokemonById(id) {
    const pokemon = await Pokemon.findByPk(id, {
        include: [
            {model: Dresseur},
        ]
    });
    if (pokemon) {
        return pokemon.toJSON();
    }
    else {
        return null;
    }
}

async function getAllPokemons(criterias = {}) {
    const where = {}
    if (criterias.name) {
        where.name = criterias.name;
    }
    if (criterias.type) {
        where.type = criterias.type;
    }
    if (criterias.hp) {
        where.hp = criterias.hp;
    }
    if (criterias.attack) {
        where.attack = criterias.attack;
    }
    if (criterias.defense) {
        where.defense = criterias.defense;
    }
    const pokemons = await Pokemon.findAll({
        where,
        include: [
            {model: Dresseur},
        ]
    });
    if(pokemons) {
        return pokemons;
    }
    else {
        return null;
    }
}

async function getLimitedPokemons(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.name) {
        where.name = criterias.name;
    }
    if (criterias.type) {
        where.type = criterias.type;
    }
    if (criterias.hp) {
        where.hp = criterias.hp;
    }
    if (criterias.attack) {
        where.attack = criterias.attack;
    }
    if (criterias.defense) {
        where.defense = criterias.defense;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await Pokemon.findAndCountAll({
        where,
        include: [
            {model: Dresseur},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        pokemons: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function addDresseurToPokemon(idDresseur, pokemonId) {
    const pokemon = await Pokemon.findByPk(pokemonId);
    const isDresseur = await Dresseur.findByPk(idDresseur)
    if (isDresseur) {
        // verifier si Pokemon et Dresseur deja associés
        const isDresseurpokemon = await Pokemon.findAll({ where: { id: pokemonId }, include: { model: Dresseur, where: { id: idDresseur } } });
        if (isDresseurpokemon.lenght > 0) {
            return null;
        }
        else {
            return pokemon.addDresseur(idDresseur);
        }
    }
}

async function updatePokemon(pokemonId, updatedData) {
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (pokemon) {
        return pokemon.update(updatedData);
    }
    else {
        return null;
    }
}

async function deletePokemon(pokemonId) {
    const pokemon = await Pokemon.findByPk(pokemonId);
    if (pokemon) {
        return pokemon.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createPokemon, createAssociatedPokemon, getPokemonById, getAllPokemons, getLimitedPokemons, addDresseurToPokemon, updatePokemon, deletePokemon }