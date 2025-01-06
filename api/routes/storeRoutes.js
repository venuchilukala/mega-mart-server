const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const storeController = require('../controllers/storeController')

// Get all products 
router.get('/', storeController.getAllStores)
router.get('/:id', storeController.getStore)

module.exports = router