const express = require('express')
const router = express.Router()

const { 
    createJobs, 
    getJobs, 
    updateJobs, 
    deleteJobs 
} = require('../controllers/jobController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, createJobs)
router.get('/', protect, getJobs)
router.put('/:id', protect,  updateJobs)
router.delete('/:id', protect, deleteJobs)


module.exports = router