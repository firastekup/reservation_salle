const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schemaAuth = mongoose.Schema({
    email: String,
    password: String,
    firstName:String,
    lastName:String,
    phoneNumber:String,
    Cin:String
});

const User = mongoose.model('user', schemaAuth);
const url = "mongodb://localhost:27017/projet_node";

// Connexion à MongoDB au démarrage de l'application
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Connection to MongoDB failed:", err));

exports.registerFunctionModel = (email, password,firstName,lastName,phoneNumber,cin) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }).then((user) => {
            if (user) {
                reject('Email is already used');
            } else {
                return bcrypt.hash(password, 10);
            }
        }).then((hashedPassword) => {
            let user = new User({
                email: email,
                firstName: firstName,
                lastName:lastName,
                phoneNumber:phoneNumber,
                cin:cin,
                password: hashedPassword
            });
            return user.save();
        }).then(() => {
            resolve('Registered successfully');
        }).catch((err) => {
            reject(err);
        });
    });
};

exports.loginFunctionModel = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                reject('User not found');
            } else {
                bcrypt.compare(password, user.password).then((verif) => {
                    if (verif) {
                        resolve(user._id);
                    } else {
                        reject('Invalid password');
                    }
                });
            }
        }).catch((err) => {
            reject(err);
        });
    });
};
