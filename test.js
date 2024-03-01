const express = require('express');
const path=require('path')
const dotenv = require('dotenv');
const session=require('express-session')
const mongodbstore=require('connect-mongodb-session')(session)
const app = express();

var store=new  mongodbstore({

    uri:'mongodb://localhost:27017/projet_node',
    collection: 'sessions'
})
app.use(session({
    secret:'this is my secert key',
    store:store,
    resave:true,
    saveUninitialized:true

}))



const authRouter = require('./routers/auth.route');

app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')







dotenv.config();

app.set('view engine', 'ejs');

// Définir le chemin vers les fichiers de vue
app.set('views', path.join(__dirname, 'views'));

//app.get('/login', (req, res,next) => {
   // res.render('login');
//});


//app.get('/register', (req, res) => {
  //  res.render('login');
//});

app.use('/',authRouter)



const PORT = process.env.PORT || 3000;

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
