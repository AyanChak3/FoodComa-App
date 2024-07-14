const express = require('express');
const { getCartByUser, modifyProductTocart, clearCartbyId } = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();
cartRouter.get('/',isLoggedIn ,getCartByUser)//show the cart of those user who are logged In
cartRouter.post('/:operation/:productId',isLoggedIn,modifyProductTocart)
cartRouter.delete('/products',isLoggedIn,clearCartbyId)
module.exports = cartRouter;