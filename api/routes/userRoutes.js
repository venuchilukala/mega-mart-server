const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin')

router.get('/',verifyToken, userController.getAllUsers);
router.get('/:email',verifyToken ,userController.getUser);
router.post('/', userController.creteUser);
router.delete('/:id', verifyToken,verifyAdmin , userController.deleteUser)
router.get('/admin/:email',verifyToken ,userController.getAdmin)
router.patch('/admin/:id',verifyToken,verifyAdmin , userController.changeUserRole)

module.exports = router