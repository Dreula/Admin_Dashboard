const Volunteer = require('../models/volunteerModel')
const mongoose = require('mongoose')

//GET ALL DATA
const getVolunteers = async (req, res) => {
    const volunteers = await Volunteer.find({})

    res.status(200).json(volunteers)
}

//GET SINGLE DATA
const getVolunteer = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Volunteer like that'})
    }

    const volunteer = await Volunteer.findById(id)

    if (!volunteer) {
        return res.status(404).json({error: 'Volunteer Not Found'})
    }

    res.status(200).json(volunteer)
}

//DELETE DATA
const deleteVolunteer = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Volunteer like that'})
    }

    const volunteer = await Volunteer.findOneAndDelete({_id: id})

    if (!volunteer) {
        return res.status(404).json({error: 'Volunteer Not Found'})
    }

    res.status(200).json(volunteer)
}

//UPDATE A DATA

module.exports = {
    getVolunteers,
    getVolunteer,
    deleteVolunteer
}