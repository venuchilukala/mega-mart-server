const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

// Get all products 
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProduct)
router.post('/', productController.postProduct)
router.delete('/:id', productController.deleteProduct)
router.patch('/:id', productController.updateProduct)

module.exports = router