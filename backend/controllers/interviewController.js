const Interview = require('../models/interviewModel')
const Job = require('../models/jobModel')
const asyncHandler = require('express-async-handler')

// @desc Create an Interview
// @route POST /api/interview/:id
// @access Private
const createInterview = asyncHandler(async(req, res) => {
    // check if the job for this interview exists
    const jobExists = await Job.findById(req.params.id)

    if(!jobExists){
        res.status(404)
        throw new Error(`Job with id ${req.params.id} does not exist`)
    }

    if(!req.body){
        res.status(404)
        throw new Error('Please enter all input fields')
    }

    const interview = await Interview.create({
        jobId: req.params.id,
        description: req.body.description,
        user: req.user.id,
        success: req.body.success,
        feedback: req.body.feedback
    })

    res.status(200).json(interview)
})

// @desc Updates interview for the user for a particular job
// @route PUT /api/interviews/:id
// @access Private
const updateInterview = asyncHandler(async(req, res) => {
    const interview = await Interview.findById(req.params.id)
    
    if(!interview) {
        res.status(400)
        throw new Error('This interview cannot be found')
    }

    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }
    
    if (interview.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }

    const updatedInterview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true})
    res.status(200).json(updatedInterview)
})

// @desc Deletes an interview for the user for a particular job
// @route DELETE /api/interviews/:id
// @access Private
const deleteInterview = asyncHandler(async(req, res) => {
    const interview = await Interview.findById(req.params.id)
    if(!interview) {
        res.status(400)
        throw new Error('This interview cannot be found')
    }

    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    if (interview.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
      }

    await interview.remove()
    res.status(200).json({ id: req.params.id })
})

// @desc Get Interviews
// @route GET /api/interview/
// @access Private
const getInterview = asyncHandler(async(req, res) => {
    const interviews = await Interview.find({ user: req.user.id})

    res.status(200).json(interviews)
})

module.exports = {
    createInterview,
    updateInterview,
    deleteInterview,
    getInterview
}