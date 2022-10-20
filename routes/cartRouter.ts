import * as CartController from "../controllers/CartController"
import express from "express";
import checkAuth from "../utils/checkAuth";
import {checkCart} from "../utils/checkCart";
const router = express.Router()


router.post('/cart', checkAuth, checkCart, CartController.addToCart)

router.get('/cart', checkAuth, CartController.getCartItems)

router.delete('/cart', checkAuth, checkCart, CartController.removeCartItem)


export default router;