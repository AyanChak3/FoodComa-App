const express = require('express');
const { createUser } = require('../controllers/userController');
//We have to initialize a router object to add routes in a file
//Routers are used for seggregating your routes in different modules
const userRouter = express.Router();

userRouter.post('/',createUser)//Tells at / route,which controller(createUser)function will be hit
//In the above line, userRegistration happens
module.exports = userRouter;//exporting the Router from here
