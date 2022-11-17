const Resident = require('../models/residentModel')
const mongoose = require('mongoose')

//GET ALL DATA
const getResidents = async (req, res) => {
    const residents = await Resident.find({}).sort({createdAt: -1})
    
    res.status(200).json(residents)
}

//GET SINGLE DATA
const getResident = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Resident to found like that'})
    }

    const resident = await Resident.findById(id)

    if (!resident) {
        return res.status(404).json({error: 'Resident Not Found'})
    }

    res.status(200).json(resident)
}

//CREATE NEW DATA
const createResident = async (req, res) => {
    const {name, address, phone} = req.body

    console.log('req> body: ' + name, address, phone)
    let emptyFields = []
    if (!name) {
        emptyFields.push('name')
    }
    if (!address) {
        emptyFields.push('address')
    }
    if (!phone) {
        emptyFields.push('phone')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    //ADD Data to DB
    try {
        const resident = await Resident.create({name,address,phone})
        res.status(200).json(resident)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE DATA
const deleteResident = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Resident to DELETE like that'})
    }

    const resident = await Resident.findOneAndDelete({_id: id})

    if (!resident) {
        return res.status(404).json({error: 'Resident Not Found'})
    }

    res.status(200).json(resident)
}

//UPDATE A DATA
const updateResident = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Resident to UPDATE like that'})
    }

    const resident = await Resident.findOneAndUpdate({_id: id}, {
        ...req.body
    }, { new: true })

    if (!resident) {
        return res.status(404).json({error: 'Resident Not Found'})
    }

    res.status(200).json(resident)
}


module.exports = {
    createResident,
    getResidents,
    getResident,
    deleteResident,
    updateResident
}