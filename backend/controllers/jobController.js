const Jobs = require('../models/jobModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')


// @desc Gets all the jobs that the user has applied for
// @route GET /api/job
// @access Private
const getJobs = asyncHandler(async(req, res) => {
    const allJobs = await Jobs.find({ user: req.user.id })
    res.status(200).json({ jobs : allJobs})
})


// @desc Gets all the jobs that have been posted in this application
// @route GET /api/job
const getAllJobs = asyncHandler(async(req, res) => {
    const jobs = await Jobs.find()
    res.status(200).json(jobs)
})

// @desc Create jobs that the user has applied for
// @route POST /api/job
// @access Private
const createJobs = asyncHandler(upload.single('image'),async(req, res) => {
    try{
    // upload picture into the cloudinary app
    
    const result = await cloudinary.uploader.upload(req.file.path)
    
    if(!req.user){
        res.status(400)
        throw new Error('You are not authorized')
    }

    if(!req.body){
        res.status(400)
        throw new Error('Please fill all the fields')
    }

    const job = await Jobs.create({
        name: req.body.name,
        location: req.body.location,
        jobPosition: req.body.jobPosition,
        avatar: result.secure_url,
        cloudinaryId: result.public_id
    })
    
    
    

    
    

    res.status(200).json(job)



    }catch(err){
        console.log(err)
    }


    
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

    const updatedJob = Jobs.findByIdAndUpdate(req.params.id, req.body, { new: true })
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


// const createJobs = asyncHandler(async(req, res) => {
//     res.status(200).json('This is the response')
// })

module.exports = {
    getJobs,
    getAllJobs,
    createJobs,
    updateJobs,
    deleteJobs
}