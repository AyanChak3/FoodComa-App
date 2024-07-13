const express = require('express');
const { getCartByUser } = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();

cartRouter.get('/',isLoggedIn ,getCartByUser)//show the cart of those user who are logged In
module.exports = cartRouter;