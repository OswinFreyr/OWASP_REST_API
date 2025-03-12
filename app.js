const express = require("express");
// const cors = require("cors");
const { db } = require("./models/db");

const pokemonRouter = require("./routes/pokemonRoute");
const dresseurRouter = require("./routes/dresseurRoute");

const app = express();
const PORT = 2000;
// app.use(cors({
//     origin: 'http://localhost:4000', 
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
//     allowedHeaders: ['Content-Type'],
// }));

app.use(express.json({limit: "2mb"}));

app.use("/api/v1/pokemons",pokemonRouter);
app.use("/api/v1/dresseurs",dresseurRouter);


db.sync(/*{force : true}*/)
    .then(async () => {
            app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    });
