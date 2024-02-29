const express = require('express');
const path=require('path')
const dotenv = require('dotenv');

const authRouter = require('./routers/auth.route');
const app = express();

app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')







dotenv.config();

app.set('view engine', 'ejs');

// Définir le chemin vers les fichiers de vue
app.set('views', path.join(__dirname, 'views'));

app.get('/login', (req, res,next) => {
    res.render('login');
});


//app.get('/register', (req, res) => {
  //  res.render('login');
//});

app.use('/',authRouter)



const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
