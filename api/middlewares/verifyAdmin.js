const jwt = require('jsonwebtoken')
const User = require('../models/User')

// verify jwt token middleware 
const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email 
    const query = {email : email}
    const user = await User.findOne(query)
    const isAdmin = user?.role === 'admin'
    if(!isAdmin){
        return res.status(403).json({message : "Forbidden Access"})
    }
    next()
}

module.exports = verifyAdmin;