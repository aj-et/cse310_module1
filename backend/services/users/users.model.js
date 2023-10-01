const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User