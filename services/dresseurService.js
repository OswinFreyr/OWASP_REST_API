const { logoutDresseur } = require("../controllers/dresseurController");
const { Dresseur, Pokemon, BlacklistedToken } = require("../models/associations");
const bcrypt = require('bcrypt');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const SECRET_KEY = process.env.JWT_KEY;

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

async function loginDresseur(dresseurData) {
    const dresseur = await Dresseur.scope("withPassword").findOne({ where: { name: dresseurData.name}});
    
    const verifyPassword = async (plainPassword, hashedPassword) => {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        if (match) {
            return true;
        } else {
            return false;
        }
    }; 
    
    const verif = await verifyPassword(dresseurData.password, dresseur.password)

    if (verif) {
        const token = jwtMiddleware.generateToken(dresseur);
        return {token: token}
    }
    else {
        return null
    }
}

async function logoutDresseur(token) {
    if (!token) {
        throw new Error('No token provided');
    }

    try {
        // Verify token and get expiration time
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // Add token to blacklist
        await BlacklistedToken.create({ token, expiresAt: new Date(decoded.exp * 1000) });

        return { message: 'Logged out successfully' };
    } catch (error) {
        throw new Error('Invalid token');
    }
}

module.exports = { createDresseur, getDresseurById, getAllDresseurs, addPokemonToDresseur, updateDresseur, deleteDresseur, loginDresseur, logoutDresseur }