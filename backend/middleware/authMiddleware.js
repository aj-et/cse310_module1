const asyncMiddleware = require('./asyncMiddleware')
const jwt = require('../utils/jwt')
const User = require('../services/users/users.model')

module.exports = asyncMiddleware ( async ( req, res, next) => {
    const {authorization} = req.headers

    if ( authorization && authorization.startsWith('Bearer')) {
        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(token)

        const user = await User.findById(decoded._id).select('-password')

        if(user) {
            req.user = user
            next()
        } else {
            res.status(401)
            throw new Error("Not authorized, Invalid token")
        }
    } else {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})