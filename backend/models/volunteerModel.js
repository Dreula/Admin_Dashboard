const mongoose = require('mongoose')

const Schema = mongoose.Schema

const volunteerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Volunteer', volunteerSchema)