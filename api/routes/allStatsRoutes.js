const express = require('express')
const router = express.Router();


//Get models
const User = require('../models/User')
const Product = require('../models/Product')
const Store = require('../models/Store')
// const Menu = require('../model/Menu')
// const Payment = require('../model/Payment')

//import middleware
const verifyToken = require('../middlewares/verifyToken')
const verifyAdmin = require('../middlewares/verifyAdmin')

router.get('/', async (req, res) => {
    try {
        const users = await User.countDocuments();
        const productItems = await Product.countDocuments();
        const stores = await Store.countDocuments();

        // const result = await Payment.aggregate([
        //     {
        //         $group: {
        //             _id: null,
        //             totalRevenue: {
        //                 $sum: '$price'
        //             }
        //         }
        //     }
        // ])
        // const revenue = result.length > 0 ? result[0].totalRevenue : 0

        res.json({
            users,
            productItems,
            stores,
            revenue : "16528"
        })
    } catch (error) {
        res.status(500).json({message : error. message})
    }
})

module.exports = router