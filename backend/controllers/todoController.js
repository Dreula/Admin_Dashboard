const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

//GET ALL DATA
const getTodos = async (req, res) => {
    const admin_id = req.admin._id

    const todos = await Todo.find({ admin_id }).sort({createdAt: -1})
    
    res.status(200).json(todos)
}

//GET SINGLE DATA
const getTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No todo to found like that'})
    }

    const todo = await Todo.findById(id)

    if (!todo) {
        return res.status(404).json({error: 'todo Not Found'})
    }

    res.status(200).json(todo)
}

//CREATE NEW DATA
const createTodo = async (req, res) => {
    const {todos} = req.body

    //ADD Data to DB
    try {
        const admin_id = req.admin._id
        const todo = await Todo.create({todos, admin_id})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE DATA
const deleteTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No todo to DELETE like that'})
    }

    const todo = await Todo.findOneAndDelete({_id: id})

    if (!todo) {
        return res.status(404).json({error: 'todo Not Found'})
    }

    res.status(200).json(todo)
}

//UPDATE A DATA
const updateTodo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No todo to UPDATE like that'})
    }

    const todo = await Todo.findOneAndUpdate({_id: id}, {
        ...req.body
    }, { new: true })

    if (!todo) {
        return res.status(404).json({error: 'todo Not Found'})
    }

    res.status(200).json(todo)
}


module.exports = {
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
}