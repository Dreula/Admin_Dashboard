const Announcement = require('../models/announcementModel')
const mongoose = require('mongoose')

//GET ALL DATA
const getAnnouncements = async (req, res) => {
    const announcements = await Announcement.find({}).sort({createdAt: -1})
    
    res.status(200).json(announcements)
}

//GET SINGLE DATA
const getAnnouncement = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Announcement to found like that'})
    }

    const announcement = await Announcement.findById(id)

    if (!announcement) {
        return res.status(404).json({error: 'Announcement Not Found'})
    }

    res.status(200).json(announcement)
}

//CREATE NEW DATA
const createAnnouncement = async (req, res) => {
    const {title, date, time, desc} = req.body

    //ADD Data to DB
    try {
        const announcement = await Announcement.create({title, date, time, desc})
        res.status(200).json(announcement)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//DELETE DATA
const deleteAnnouncement = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Announcement to DELETE like that'})
    }

    const announcement = await Announcement.findOneAndDelete({_id: id})

    if (!announcement) {
        return res.status(404).json({error: 'Announcement Not Found'})
    }

    res.status(200).json(announcement)
}

//UPDATE A DATA
const updateAnnouncement = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Announcement to UPDATE like that'})
    }

    const announcement = await Announcement.findOneAndUpdate({_id: id}, {
        ...req.body
    }, { new: true })

    if (!announcement) {
        return res.status(404).json({error: 'Announcement Not Found'})
    }

    res.status(200).json(announcement)
}


module.exports = {
    createAnnouncement,
    getAnnouncements,
    getAnnouncement,
    deleteAnnouncement,
    updateAnnouncement
}