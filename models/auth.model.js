const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var schemaAuth = mongoose.Schema({
    email: String,
    password: String
});

var User = mongoose.model('user', schemaAuth);
var url = "mongodb://localhost:27017/projet_node";

exports.registerFunctionModel = (email, password) => {
    // Test email if exists
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
