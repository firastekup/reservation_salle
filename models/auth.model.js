const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schemaAuth = mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('user', schemaAuth);
const url = "mongodb://localhost:27017/projet_node";

exports.registerFunctionModel = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findOne({ email: email });
        }).then((user) => {
            if (user) {
                mongoose.disconnect();
                reject('Email is already used');
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
            resolve('Registered successfully');
        }).catch((err) => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.loginFunctionModel = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findOne({ email: email });
        }).then((user) => {
            if (user) {
                bcrypt.compare(password, user.password).then((verif) => {
                    if (verif) {
                        mongoose.disconnect();
                        resolve(user._id);
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
