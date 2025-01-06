const jwt = require('jsonwebtoken')

// verify jwt token middleware 
const verifyToken = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({message : "Unauthorized Access"})
    }
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
        if(error){
            return res.status(401).json({message : "Invalid Jwt token "})
        }
        req.decoded = decoded 
        next()
    })
}

module.exports = verifyToken;