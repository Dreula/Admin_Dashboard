const Email = require('../models/emailModel')
const mongoose = require('mongoose')

//GET ALL DATA
const getEmails = async (req, res) => {
    const emails = await Email.find({})

    res.status(200).json(emails)
}

//GET SINGLE DATA
const getEmail = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Email like that'})
    }

    const email = await Email.findById(id)

    if (!email) {
        return res.status(404).json({error: 'Email Not Found'})
    }

    res.status(200).json(email)
}

//CREATE NEW DATA

//DELETE DATA
const deleteEmail = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Email like that'})
    }

    const email = await Email.findOneAndDelete({_id: id})

    if (!email) {
        return res.status(404).json({error: 'Email Not Found'})
    }

    res.status(200).json(email)
}

//UPDATE A DATA

module.exports = {
    getEmails,
    getEmail,
    deleteEmail
}