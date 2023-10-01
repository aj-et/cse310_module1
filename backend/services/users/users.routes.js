const express = require("express")
const { getUsers, deleteUsers, updateUsers, register, login, getUserInfo } = require("./users.controller")
const authMiddleware = require("../../middleware/authMiddleware")

const userRouter = express.Router()

userRouter.get('/', getUsers)

userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.route('/:id')
    .put(updateUsers)
    .delete(deleteUsers)
    .get( authMiddleware, getUserInfo)

module.exports = userRouter