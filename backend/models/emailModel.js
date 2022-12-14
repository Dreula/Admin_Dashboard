const mongoose = require('mongoose')

const Schema = mongoose.Schema

const emailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    message: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Email', emailSchema)