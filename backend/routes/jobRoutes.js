const express = require('express')
const router = express.Router()
const { 
    getJobs,
    createJobs,
    updateJobs,
    deleteJobs } = require('../controllers/jobController')

router.get('/', getJobs)
router.post('/', createJobs)
router.put('/:id', updateJobs)
router.delete('/:id', deleteJobs)

module.exports = router