const express = require('express');
const { login, logout } = require('../controllers/authController');
//We have to initialize a router object to add routes in a file
//Routers are used for seggregating your routes in different modules
const authRouter = express.Router();

authRouter.post('/login',login)//Tells at / route,which controller(createUser)function will be hit
authRouter.post('/logout',logout)
//In the above line, userRegistration happens
module.exports = authRouter;//exporting the Router from here