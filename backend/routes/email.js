const express = require('express')
const { 
    getEmails,
    getEmail,
    deleteEmail
 } = require('../controllers/emailController')

const router = express.Router() 

//GET all data
router.get('/', getEmails)

//Get Single Data
router.get('/:id', getEmail)

//DELETE a DATA
router.delete('/:id', deleteEmail)

module.exports = router