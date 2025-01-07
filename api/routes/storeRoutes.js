const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const storeController = require('../controllers/storeController')

// Get all products 
router.get('/', storeController.getAllStores)
router.get('/:id', storeController.getStore)
router.post('/', storeController.createStore)
router.delete('/:id', storeController.deleteStore)
router.patch('/:id', storeController.updateStore)

module.exports = router