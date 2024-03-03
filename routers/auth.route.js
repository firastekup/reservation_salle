const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get('/register', AuthController.getRegisterPage);
router.post('/register', urlencodedParser, AuthController.postRegisterData);

router.get('/login', AuthController.getLoginPage);
router.post('/login', urlencodedParser, AuthController.postLoginData);


router.post('/logout',AuthController.logoutfunctioncontroller)

module.exports = router;
