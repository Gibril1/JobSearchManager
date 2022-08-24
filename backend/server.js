const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require('./config/db')

connectDB()

app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/job', require('./routes/jobRoutes'))
app.use('/api/interview', require('./routes/interviewRoutes'))

app.listen(port, console.log(`Server is listening at port ${port}`))