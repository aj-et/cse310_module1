const express = require("express")
const authMiddleware = require("../../middleware/authMiddleware")
const { getTodo, addTodo, updateTodo, deleteTodo } = require('./todos.controller')

const TodoRouter = express.Router()

TodoRouter
    .route('/')
    .all(authMiddleware)
    .get(getTodo)
    .post(addTodo)

TodoRouter
    .route('/:id')
    .all(authMiddleware)
    .put(updateTodo)
    .delete(deleteTodo)

module.exports = TodoRouter