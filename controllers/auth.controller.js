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
            
        });
}

exports.getLoginPage = (req, res, next) => {
    res.render('login');
}

exports.postLoginData = (req, res, next) => {
    authmodel.loginFunctionModel(req.body.email, req.body.password)
        .then((userId) => {
            req.session.userId = userId;
            res.redirect('/reservation'); d
        })
        .catch((err) => {
            console.log(err);
            
        });
}

exports.logoutfunctioncontroller=(req,res,next)=>{
req.session.destroy(()=>{
    res.redirect('/logout')
})

}