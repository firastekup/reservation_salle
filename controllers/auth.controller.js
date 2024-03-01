const authmodel = require('../models/auth.model');

exports.getRegisterPage = (req, res, next) => {
    res.render('register');
}

exports.postRegisterData = (req, res, next) => {
    authmodel.registerFunctionModel(req.body.email,req.body.password,req.body.firstName,req.body.lastName,req.body.phoneNumber,req.body.cin)
        .then(() => {
            res.redirect('/login');
        })
        .catch((msg) => {
            console.log(msg);
            // handle error appropriately, e.g., render an error page
        });
}

exports.getLoginPage = (req, res, next) => {
    res.render('login');
}

exports.postLoginData = (req, res, next) => {
    authmodel.loginFunctionModel(req.body.email, req.body.password)
        .then((userId) => {
            req.session.userId = userId;
            res.redirect('/'); // Redirect to homepage or any other page as needed
        })
        .catch((err) => {
            console.log(err);
            // handle error appropriately, e.g., render an error page
        });
}
