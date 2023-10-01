const asyncMiddleware = require("../../middleware/asyncMiddleware")
const Todo = require("./todos.model")

/**
 * @roue api/todos;
 * @method post
 * @access private
 */
const addTodo = asyncMiddleware(async(req, res) => {
    const user = req.user

    const {title} = req.body

    const created_todo = await Todo.create({
        title,
        owner: user._id
    })
    res.status(201).send(created_todo)
})

/**
 * @roue api/todos;
 * @method get
 * @access private
 */
const getTodo = asyncMiddleware(async(req, res) => {
    const user = req.user
    const todos = await Todo.find({owner: user._id})
    res.status(200).send(todos)
})

/**
 * @roue api/todos/:id;
 * @method delete
 * @access private
 */
const deleteTodo = asyncMiddleware(async(req, res) => {
    const user = req.user
    const todo = await Todo.findById(req.params.id)
    
    if (todo.owner.toString() !== user._id.toString()) {
        res.status(401)
        throw new Error ("Unauthorized access, invalid user")
    }

    await Todo.findByIdAndRemove(req.params.id)
    res.status(204).send("Todo Deleted")
})

/**
 * @roue api/todos/:id;
 * @method put
 * @access private
 */
const updateTodo = asyncMiddleware(async(req, res) => {
    const user = req.user
    const id = req.params.id

    const todo = await Todo.findById(id)

    if (todo.owner.toString() !== user._id.toString()) {
        res.status(401)
        throw new Error('Unauthorized access, invalid user')
    }

    const updated_todo = await Todo.findByIdAndUpdate(id, {title: req.body.title}, {new: true})
    res.status(200).send(updated_todo)
})

module.exports = {
    addTodo,
    deleteTodo,
    getTodo,
    updateTodo
}
