import * as CartController from '../controllers/CartController';
import * as OrderController from '../controllers/OrderController';
import express from 'express';
import checkAuth from '../utils/checkAuth';
import { checkCart } from '../utils/checkCart';
import { checkAdmin } from '../utils/checkAdmin';

const router = express.Router();

router.post('/cart', checkAuth, checkCart, CartController.addToCart);

router.get('/cart', checkAuth, CartController.getCartItems);

router.delete('/cart/:productId', checkAuth, checkCart, CartController.removeCartItem);

router.post('/order', checkAuth, OrderController.create);

router.get('/order', checkAuth, checkAdmin, OrderController.getAll);

router.get('/user-orders', checkAuth, OrderController.getUserOrders);

router.patch('/order/:orderId', checkAuth, checkAdmin, OrderController.update);

router.delete('/order/:orderId', checkAuth, checkAdmin, OrderController.remove);

router.get('/order/:orderId', checkAuth, checkAdmin, OrderController.getOne);

export default router;
