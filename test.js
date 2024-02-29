// Importer les modules nécessaires
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement depuis .env
dotenv.config();

const app = express();

app.set('view engine', 'ejs');

// Définir le chemin vers les fichiers de vue
app.set('views', path.join(__dirname, 'views'));

app.get('/login', (req, res) => {
    res.render('login');
});

const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
