const express = require('express')
const { 
    getVolunteers,
    getVolunteer,
    deleteVolunteer
 } = require('../controllers/volunteerController')

const router = express.Router() 

//GET all data
router.get('/', getVolunteers)

//Get Single Data
router.get('/:id', getVolunteer)

//DELETE a DATA
router.delete('/:id', deleteVolunteer)

module.exports = router