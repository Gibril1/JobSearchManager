const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer

connectDB()

app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/job', require('./routes/jobRoutes'))
app.use('/api/interview', require('./routes/interviewRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, console.log(`Server is listening at port ${port}`))