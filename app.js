const express = require("express");
// const cors = require("cors");
const { db } = require("./models/db");

const jwtMiddleware = require('./middlewares/jwtMiddleware');

const authRouter = require("./routes/authRoute");

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

app.use("/api/v1/login", authRouter);

app.use("/api/v1/pokemons", jwtMiddleware.jwtMiddleware, pokemonRouter);
app.use("/api/v1/dresseurs", jwtMiddleware.jwtMiddleware, dresseurRouter);


db.sync(/*{force : true}*/)
    .then(async () => {
            app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    });
