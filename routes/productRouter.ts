import express from 'express';
import * as ProductController from '../controllers/ProductController';
import checkAuth from '../utils/checkAuth';
import { checkAdmin } from '../utils/checkAdmin';
import range from '../utils/range';

const router = express.Router();

router.post('/product', checkAuth, checkAdmin, ProductController.create);

router.get('/product', range, ProductController.getAll);

router.get('/product/:productId', ProductController.getOne);

router.patch('/product/:productId',  checkAuth, checkAdmin, ProductController.update);

router.delete('/product/:productId', checkAuth, checkAdmin, ProductController.remove);

export default router;
