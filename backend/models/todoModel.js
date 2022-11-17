const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
    todos: {
        type: String,
        required: true
    },
    admin_id: {
      type: String,
      required: true
    }
  }, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)