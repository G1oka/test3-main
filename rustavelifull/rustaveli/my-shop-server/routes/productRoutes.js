const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to get all products
router.get('/', productController.getAllProducts);

// Route to add a new product
router.post('/', productController.addProduct);

module.exports = router;
