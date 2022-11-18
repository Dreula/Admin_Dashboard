require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const residentRoutes = require('./routes/resident')
const emailRoutes = require('./routes/email')
const adminRoutes = require('./routes/admin')
const announcementRoutes = require('./routes/announcement')
const volunteerRoutes = require('./routes/volunteer')
const todoRoutes = require('./routes/todo')
const cors = require('cors')
const PORT = process.env.PORT || 3000
//express app
const app = express()

app.use(cors())

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/resident',residentRoutes)
app.use('/api/email', emailRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/announcement', announcementRoutes)
app.use('/api/volunteer', volunteerRoutes)
app.use('/api/todo', todoRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for request
        app.listen(PORT, () => {
            console.log('Connected to DB & listening on port', PORT)
        })
    })
    .catch((error) =>{
        alert(error)
        console.log(error)
    })

