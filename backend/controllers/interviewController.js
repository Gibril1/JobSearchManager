const Interview = require('../models/interviewModel') 
const Job = require('../models/jobModel')

// @desc Get all the interviews that the user has had for that particular job
// @route GET /api/interviews
// @access Private
const getInterview = async (req, res) => {
    const interviews = await Interview.find()
    res.status(200).json({interviews: interviews})
}


// @desc Creates a new interview for the user for a particular job
// @route POST /api/interviews
// @access Private
const createInterview = async (req, res) => {
    if(!req.body) {
        res.status(400)
        res.json('Enter your fields')
    }
    
    
    const interview = {
        description : req.body.description,
        date : req.body.date,
        success : req.body.success,
        feedback : req.body.feedback,
        jobId : req.body.jobId
     }

    const myInterview = new Interview(interview)
    await myInterview.save()
    
    res.status(200).json(myInterview)
}

// @desc Updates interview for the user for a particular job
// @route PUT /api/interviews/id
// @access Private
const updateInterview = async(req, res) => {
    const interview = Interview.findById(req.params.id)
    if(!interview) {
        res.status(400)
        throw new Error('This interview cannot be found')
    }

    const updatedInterview = Interview.findByIdAndUpdate(req.params.id, req.body, { new : true })
    res.status(200).json(updatedInterview)
}

// @desc Deletes an interview for the user for a particular job
// @route POST /api/interviews
// @access Private
const deleteInterview = async(req, res) => {
    const interview = Interview.findById(req.params.id)
    if(!interview) {
        res.status(400)
        throw new Error('This interview cannot be found')
    }

    await interview.remove()
    res.status(200).json({ id: req.params.id })
}

module.exports = {
    getInterview,
    createInterview,
    updateInterview,
    deleteInterview
}