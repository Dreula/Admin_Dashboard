const express = require('express')
const { 
    createResident,
    getResidents,
    getResident,
    deleteResident,
    updateResident
 } = require('../controllers/residentController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router() 

// require auth for all residents data
router.use(requireAuth)

//GET all data
router.get('/', getResidents)

//Get Single Data
router.get('/:id', getResident)

//POST new DATA
router.post('/', createResident)

//DELETE a DATA
router.delete('/:id', deleteResident)

//UPDATE a DATA
router.patch('/:id', updateResident)

module.exports = router