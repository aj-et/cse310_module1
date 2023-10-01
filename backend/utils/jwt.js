const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    generate: (_id) => jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '30d'}),
    verify: (token) => jwt.verify(token, process.env.JWT_SECRET)
}