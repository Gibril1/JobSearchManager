const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')




connectDB()

app = express()
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true, limit:"50mb" }))






app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/job', require('./routes/jobRoutes'))
app.use('/api/interview', require('./routes/interviewRoutes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})

