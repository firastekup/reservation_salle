const authmodel=require('../models/auth.model')



exports.getRegisterPage=(req,res,next)=>
{
res.render('register')

}

exports.postRegiterData=(req,res,next)=>{
authmodel.registerFunctionModel(req.body.email,req.body.password).then((user)=>{
res.render('/login')
}).catch((msg)=>{

    console.log(msg)
})

}




exports.getloginpage=(req,res,next)=>
{
res.render('login')

}





exports.PostLoginData=(req,res,next)=>{
    authmodel.loginmodelfunctionModel(req.body.email,req.body.password).then((id)=>{
        req.session.userId=id
    }).catch((err)=>{console.log(err)})
}