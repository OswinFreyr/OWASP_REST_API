const pokemonService = require("../services/pokemonService");

async function createPokemon(req, res) {
    try {
        const pokemon = await pokemonService.createPokemon(req.body);
        res.json(pokemon);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function createAssociatedPokemon(req, res) {
    try {
        const pokemon = await pokemonService.createPokemon(req.body);
        res.json(pokemon);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getPokemonById(req, res) {
    try {
        const id = req.query.id;
        const pokemon = await pokemonService.getPokemonById(id);
        if(pokemon){
            res.json(pokemon);
        }
        else {
            res.json({"error": `Pokemon ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllPokemons(req, res) {
    try{
        const { offset, limit, name, type, hp, attack, defense } = req.query;
        const pokemons = await pokemonService.getAllPokemons({ offset, limit, name, type, hp, attack, defense });
        res.json(pokemons);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedPokemons(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, name, type, hp, attack, defense } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await pokemonService.getLimitedPokemons({ offset, limit, name, type, hp, attack, defense }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += name ? `&name=${name}` : "";
        queryParams += type ? `&type=${type}` : "";
        queryParams += hp ? `&hp=${hp}` : "";
        queryParams += attack ? `&attack=${attack}` : "";
        queryParams += defense ? `&defense=${defense}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.pokemons, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function addDresseurToPokemon(req, res){
    try {
        const idPokemon = req.query.idPokemon;
        const idDresseur = req.query.idDresseur;
        const dresseurPokemon = await pokemonService.addDresseurToPokemon(idDresseur,idPokemon);
        res.json({ DresseurPokemon: dresseurPokemon, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function updatePokemon (req, res){
    try {
        const idPokemon = req.query.idPokemon;
        const pokemon = await pokemonService.updatePokemon(idPokemon, req.body);
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deletePokemon (req, res){
    try {
        const idPokemon = req.query.idPokemon;
        const pokemon = await pokemonService.deletePokemon(idPokemon);
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createPokemon, createAssociatedPokemon, getPokemonById, getAllPokemons, getLimitedPokemons, addDresseurToPokemon, updatePokemon, deletePokemon }