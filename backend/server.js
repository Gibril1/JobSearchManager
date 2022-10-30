const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const multer = require('multer')
const upload = multer

connectDB()

app = express()

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit:"50mb" }))

app.use('/api/job', require('./routes/jobRoutes'))
app.use('/api/interview', require('./routes/interviewRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, console.log(`Server is listening at port ${port}`))