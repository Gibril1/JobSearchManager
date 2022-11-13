const express = require('express')
const router = express.Router()

const {
    createInterview,
    getInterview,
    updateInterview,
    deleteInterview
} = require('../controllers/interviewController')

const { protect } = require('../middleware/authMiddleware')

router.get('/',protect, getInterview)
router.route('/:id').post(protect, createInterview).delete(protect, deleteInterview).put(protect, updateInterview)

module.exports = router