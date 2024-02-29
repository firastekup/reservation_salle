
const route=require('express').Router()
const Authcontroller = require ("../controllers/auth.controller")

const body=require('express').urlencoded({extended:true})


route.get('/register',Authcontroller.getRegisterPage)
route.post('/register',body,Authcontroller.postRegiterData)


module.exports=route