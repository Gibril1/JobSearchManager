const express = require('express')
const router = express.Router()

const {
    createInterview,
    getInterview,
    updateInterview,
    deleteInterview
} = require('../controllers/interviewController')

const { protect } = require('../middleware/authMiddleware')


router.post('/', protect, createInterview)
router.route('/:id').get(protect, getInterview).delete(protect, deleteInterview).put(protect, updateInterview)

module.exports = router