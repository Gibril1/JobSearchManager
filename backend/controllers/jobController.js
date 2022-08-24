const Jobs = require('../models/jobModel')

// @desc Gets all the jobs that the user has applied for
// @route GET /api/job
// @access Private
const getJobs = async (req, res) => {
    const allJobs = await Jobs.find()
    res.status(200).json({ jobs : allJobs})
}

// @desc Create jobs that the user has applied for
// @route POST /api/job
// @access Private
const createJobs = async (req, res) => {
    // check if the fields are not empty
    if(!req.body){
        res.status(400)
        throw new Error('Please enter all the fields')
    }

    const job = await Jobs.create({
        name: req.body.name,
        location: req.body.location,
        jobPosition: req.body.jobPosition,
        cv: req.body.cv
    })

    res.status(200).json(job)
}

// @desc Update jobs that the user has applied for
// @route PUT /api/job
// @access Private
const updateJobs = async(req, res) => {
    const job = Jobs.findById(req.params.id)
    if(!job){
        res.status(400)
        res.json('Job not found')
    }

    const updatedJob = Jobs.findByIdAndUpdate(req.params.id, req.body, { new: true})
    res.status(200).json(updatedJob)
}

// @desc Delete jobs that the user has applied for
// @route DELETE /api/job
// @access Private
const deleteJobs = async(req, res) => {
    const job = Jobs.findById(req.params.id)
    if(!job){
        res.status(400)
        res.json('Job not found')
    }

    await job.remove()
    res.status(200).json({ id: req.params.id })

}
module.exports = {
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs
}