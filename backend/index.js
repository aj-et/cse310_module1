const express = require("express")
const cors = require('cors')
const dotenv  = require('dotenv')
const userRouter = require("./services/users/users.routes")
const db = require("./config/db")
const errorMiddleware = require("./middleware/errorMiddleware")
const TodoRouter = require("./services/todos/todos.routes")

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

const PORT = process.env.PORT || 3000

db()

app.use('/api/users', userRouter)
app.use('/api/todos', TodoRouter)
app.use(errorMiddleware)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))