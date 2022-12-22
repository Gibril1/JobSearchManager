const Job = require('../models/jobModel')
const asyncHandler = require('express-async-handler')
const cloudinary = require('../utils/cloudinary')


// @desc Create Jobs
// @routes POST /api/jobs
// @access Private
const createJobs = asyncHandler(async(req, res) => {
    try {

        
         // uploads image file to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path)
        

        if(!req.user){
            res.status(400)
            throw new Error('Not authorized')
        }
    
        if(!req.body){
            res.status(400)
            throw new Error('Please enter all the fields')
        }

        const job = await Job.create({
            name: req.body.name,
            location: req.body.location,
            jobPosition: req.body.jobPosition,
            user: req.user.id ,
            avatar: result.secure_url,
            cloudinaryId: result.public_id
        })

        res.status(200).json(job)
        } catch (error) {
        console.log(error)
        }
})


// @desc Get Jobs
// @routes GET /api/jobs
// @access Private
const getJobs = asyncHandler(async(req, res) => {
    if(!req.user){
        res.status(400)
        throw new Error('Not authorized')
    }

    const job = await Job.find({ user: req.user.id })
    
    res.status(200).json(job)
})

// @desc Get Job
// @routes GET /api/jobs/:id
// @access Private
const getJob = asyncHandler(async(req, res) => {
    const job = await Job.findById(req.params.id)

    if(!job){
        res.status(400)
        throw new Error(`Job with id ${req.params.id} does not exist`)
    }

    
    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    res.status(200).json(job)
})

// @desc Update Jobs
// @routes PUT /api/jobs/:id
// @access Private
const updateJobs = asyncHandler(async(req, res) => {
    // res.json(req.body)
    const job = await Job.findById(req.params.id)
    
    if(!job){
        res.status(400)
        throw new Error(`Job with id ${req.body.id} does not exist`)
    }

    
    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    if (job.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }
    
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
    
    res.status(200).json(updatedJob)
})

// @desc Delete Jobs
// @routes DELETE /api/jobs/:id
// @access Private
const deleteJobs = asyncHandler(async(req, res) => {
    const job = await Job.findById(req.params.id)
    if(!job){
        res.status(400)
        res.json('Job not found')
    }

    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    if (job.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }

    await job.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    createJobs,
    getJobs,
    getJob,
    updateJobs,
    deleteJobs
}