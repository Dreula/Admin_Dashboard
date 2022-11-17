const express = require('express')
const { 
    createAnnouncement,
    getAnnouncements,
    getAnnouncement,
    deleteAnnouncement,
    updateAnnouncement
 } = require('../controllers/AnnouncementController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router() 

// require auth for all Announcements data
router.use(requireAuth)

//GET all data
router.get('/', getAnnouncements)

//Get Single Data
router.get('/:id', getAnnouncement)

//POST new DATA
router.post('/', createAnnouncement)

//DELETE a DATA
router.delete('/:id', deleteAnnouncement)

//UPDATE a DATA
router.patch('/:id', updateAnnouncement)

module.exports = router