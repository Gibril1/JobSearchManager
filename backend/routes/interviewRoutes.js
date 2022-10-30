const express = require('express')
const router = express.Router()
const { 
    getInterview,
    getAllInterviews,
    createInterview,
    updateInterview,
    deleteInterview 
} = require('../controllers/interviewController')

const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getInterview)
router.get('/all', getAllInterviews)
router.post('/', protect, createInterview)
router.put('/:id',protect, updateInterview)
router.delete('/:id', protect, deleteInterview)

module.exports = router