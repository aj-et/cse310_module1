const User = require("./users.model")

const asyncMiddleware = require('../../middleware/asyncMiddleware')
const passwordManager = require("../../utils/passwordManager")
const jwt = require("../../utils/jwt")

const getUsers = asyncMiddleware ( async ( _req, res) => {
    const users = await User.find().select('-password')
    res.status(200).send( users )
})

const register = asyncMiddleware ( async (req, res) => {
    const {name, email, password} = req.body

    if ( !name || !email || !password ) throw new Error("Please fill all fields")

    const user_exists = await User.findOne( {email} )

    if (user_exists) throw new Error("User already exists")

    const hashed_password = await passwordManager.hashPassword(password)

    const new_user = await User.create({
        name,
        email,
        password: hashed_password
    })
    res.status(201).send({
        _id: new_user._id,
        name: new_user.name,
        email: new_user.email,
        createdAt: new_user.createdAt,
        updatedAt: new_user.updatedAt,
        token: jwt.generate( new_user._id)
    })
})

const login = asyncMiddleware( async (req, res) => {
    const {email, password} = req.body

    const existing_user = await User.findOne({email})
    if (!existing_user) throw new Error("Invalid email")

    if (await passwordManager.comparePassword(password, existing_user.password)) {
        res.status(200).send({
            _id: existing_user._id,
            name: existing_user.name,
            email: existing_user.email,
            createdAt: existing_user.createdAt,
            updatedAt: existing_user.updatedAt,
            token: jwt.generate( existing_user._id)
        })
    } else throw new Error("Invalid password")
})

const updateUsers = asyncMiddleware ( async (req, res) => {
    if (req.body?.name === '') throw new Error("Name is required")
    const updated_user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).send(updated_user)
})

const deleteUsers = asyncMiddleware ( async (req, res) => {
    const user_id = req.params.id
    await User.findByIdAndRemove(user_id)
    res.status(204).end()
})

const getUserInfo = asyncMiddleware( async(req, res) => {
    const user = req.user
    const id = req.params.id

    if (user?._id.toString() !== id) {
        res.status(401)
        throw new Error("Not authorized, invalid user")
    }

    const info = await User.findById(user._id).select('-password')
    res.status(200).send(info)
})

module.exports = {
    getUsers,
    register,
    login,
    updateUsers,
    deleteUsers,
    getUserInfo
}