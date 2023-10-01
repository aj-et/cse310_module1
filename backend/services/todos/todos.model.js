const mongoose = require("mongoose")

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "User"
    }
}, {
    timestamps: true
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo