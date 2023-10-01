const dotenv  = require('dotenv')
dotenv.config()

module.exports = (err, req, res, next) => {
    res
        .status( res.statusCode < 400 ? 400 : res.statusCode || 500 )
        .send({
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
        })
}