const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var schemaAuth = mongoose.Schema({
    email: String,
    password: String
});

var User = mongoose.model('user', schemaAuth);
var url = "mongodb://localhost:27017/projet_node";

exports.registerFunctionModel = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findOne({ email: email });
        }).then((user) => {
            if (user) {
                mongoose.disconnect();
                reject('email is used');
            } else {
                return bcrypt.hash(password, 10);
            }
        }).then((hashedPassword) => {
            let user = new User({
                email: email,
                password: hashedPassword
            });
            return user.save();
        }).then((user) => {
            mongoose.disconnect();
            resolve('registered');
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.loginFunctionModel = (email, password) => { // Correction: Les paramètres doivent être (email, password) au lieu de ((email,password))
    return new Promise((resolve, reject) => { // Correction: Utilisez `Promise` au lieu de `promise`
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findOne({ email: email });
        }).then((user) => {
            if (user) {
                bcrypt.compare(password, user.password).then((verif) => {
                    if (verif) {
                        mongoose.disconnect();
                        resolve(user._id); // Correction: Utilisez `user._id` au lieu de `'user._id'`
                    } else {
                        mongoose.disconnect();
                        reject('Invalid password');
                    }
                });
            } else {
                mongoose.disconnect();
                reject('User not found');
            }
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};
