const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { db } = require("./models/db");

const pokemonRouter = require("./routes/pokemonRoute");
const dresseurRouter = require("./routes/dresseurRoute");
const authRouter = require("./routes/authRoutes"); 

const app = express();
const PORT = 2000;

app.use(express.json({ limit: "2mb" })); //limite taille json évite DoS
app.use(cookieParser());
app.use(session({
    //TODO passer secret en var env
    secret: 'monSuperSecret', //cle secrete signature cookie évite falsification de session
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 30 } // expiration 30mn
}));

// Routes
app.use("/api/v1/pokemons", pokemonRouter);
app.use("/api/v1/dresseurs", dresseurRouter);
app.use("/api/v1/auth", authRouter); 

db.sync(/*{ force: true }*/)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    });
