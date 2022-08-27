const Jobs = require('../models/jobModel')
const asyncHandler = require('express-async-handler')

// @desc Gets all the jobs that the user has applied for
// @route GET /api/job
// @access Private
const getJobs = asyncHandler(async(req, res) => {
    const allJobs = await Jobs.find({ user: req.user.id })
    res.status(200).json({ jobs : allJobs})
})

// @desc Create jobs that the user has applied for
// @route POST /api/job
// @access Private
const createJobs = asyncHandler(async (req, res) => {
    // check if the fields are not empty
    if(!req.body){
        res.status(400)
        throw new Error('Please enter all the fields')
    }

    const job = await Jobs.create({
        name: req.body.name,
        location: req.body.location,
        jobPosition: req.body.jobPosition,
        cv: req.body.cv,
        user: req.user.id
    })

    res.status(200).json(job)
})

// @desc Update jobs that the user has applied for
// @route PUT /api/job
// @access Private
const updateJobs = asyncHandler(async(req, res) => {
    const job = await Jobs.findById(req.params.id)
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

    const updatedJob = Jobs.findByIdAndUpdate(req.params.id, req.body, { new: true})
    res.status(200).json(updatedJob)
})

// @desc Delete jobs that the user has applied for
// @route DELETE /api/job
// @access Private
const deleteJobs = asyncHandler(async(req, res) => {
    const job = await Jobs.findById(req.params.id)
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
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs
}