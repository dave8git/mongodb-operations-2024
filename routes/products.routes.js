// post.routes.js

const express = require('express');
const router = express.Router();
//const db = require('./../db');
//const ObjectId = require('mongodb').ObjectId;
const ProductsControllers = require('../controllers/products.controller');
//const Product = require('../models/product.model.js');

router.get('/products', ProductsControllers.getAll);

router.get('/products/random', ProductsControllers.getRandom);

router.get('/products/:id', ProductsControllers.getById);

router.post('/products', ProductsControllers.post);

router.put('/products/:id', ProductsControllers.put);

router.delete('/products/:id', ProductsControllers.delete);

module.exports = router;