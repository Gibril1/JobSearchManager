const express = require('express')
const router = express.Router()
const { 
    getJobs,
    getAllJobs,
    createJobs,
    updateJobs,
    deleteJobs } = require('../controllers/jobController')

const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getJobs).post(protect, createJobs)
router.get('/all', getAllJobs)
router.route('/:id').put(protect, updateJobs).delete(protect, deleteJobs)


module.exports = router