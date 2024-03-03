const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');

// Importer les routes
const authRouter = require('./routers/auth.route');
const reservationRouter = require('./routers/reservation.route');

const app = express();

// Configuration de MongoDB Store pour stocker les sessions
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/projet_node',
    collection: 'sessions'
});

// Configuration de la session
app.use(session({
    secret: 'this is my secret key',
    store: store,
    resave: true,
    saveUninitialized: true
}));

// Configuration de body-parser pour analyser les données POST
app.use(bodyParser.urlencoded({ extended: true }));

// Configurer les vues et les fichiers statiques
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/projet_node', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connecté à la base de données MongoDB");
})
.catch((error) => {
    console.error("Erreur de connexion à la base de données MongoDB:", error);
});

// Utiliser les routes
app.use('/', authRouter);
app.use('/', reservationRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
