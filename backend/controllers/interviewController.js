const Interview = require('../models/interviewModel') 
const Job = require('../models/jobModel')
const asyncHandler = require('express-async-handler')

// @desc Get all the interviews that the user has had for that particular job
// @route GET /api/interviews
// @access Private
const getInterview = asyncHandler(async (req, res) => {
    const interviews = await Interview.find({ user: req.user.id })
    res.status(200).json({interviews: interviews})
})

// @desc Get all the interviews that has been saved in this application
// @route GET /api/interviews/all
// @access Public
const getAllInterviews = asyncHandler(async(req, res) => {
    const interviews = await Interview.find()
    res.status(200).json({interviews: interviews})

})

// @desc Creates a new interview for the user for a particular job
// @route POST /api/interviews
// @access Private
const createInterview = asyncHandler(async (req, res) => {
    if(!req.body) {
        res.status(400)
        res.json('Enter your fields')
    }

    // get the job for the particular interview
    const jobExists = await Job.findById(req.params.id)

    // check if the job exist
    if(!jobExists){
        res.status(404)
        throw new Error('Job does not exist')
    }

    const interview = {
        description : req.body.description,
        date : req.body.date,
        success : req.body.success,
        feedback : req.body.feedback,
        jobId : jobExists.id,
        user: req.user.id
     }


    const myInterview = new Interview(interview)
    await myInterview.save()
    
    res.status(200).json(myInterview)
})

// @desc Updates interview for the user for a particular job
// @route PUT /api/interviews/id
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

    const updatedInterview = Interview.findByIdAndUpdate(req.params.id, req.body, { new : true })
    res.status(200).json(updatedInterview)
})

// @desc Deletes an interview for the user for a particular job
// @route POST /api/interviews
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

module.exports = {
    getInterview,
    getAllInterviews,
    createInterview,
    updateInterview,
    deleteInterview
}