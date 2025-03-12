

app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const dresseur = Dresseur.find(d => d.name === dresseurname);

    if (!dresseur || !bcrypt.compareSync(password, dresseur.password)) {
        return res.status(401).json({ message: 'Identifiants invalides' });
    }

    req.session.dresseurId = dresseur.id;
    res.json({ message: 'Connexion réussie' });
});
