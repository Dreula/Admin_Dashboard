const express = require('express')
const { 
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
 } = require('../controllers/todoController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router() 

// require auth for all residents data
router.use(requireAuth)

//GET all data
router.get('/', getTodos)

//Get Single Data
router.get('/:id', getTodo)

//POST new DATA
router.post('/', createTodo)

//DELETE a DATA
router.delete('/:id', deleteTodo)

//UPDATE a DATA
router.patch('/:id', updateTodo)

module.exports = router