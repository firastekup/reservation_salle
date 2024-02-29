const authmodel=require('../models/auth.model')



exports.getRegisterPage=(req,res,next)=>
{
res.render('register')

}


exports.postRegiterData=(req,res,next)=>{
authmodel.registerFunctionModel(req.body.email,req.body.password)
}