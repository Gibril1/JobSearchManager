const express = require('express')
const router = express.Router()
const { 
    getInterview,
    createInterview,
    updateInterview,
    deleteInterview 
} = require('../controllers/interviewController')

router.get('/', getInterview)
router.post('/', createInterview)
router.put('/:id', updateInterview)
router.delete('/:id', deleteInterview)

module.exports = router