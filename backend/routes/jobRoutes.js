const express = require('express')
const router = express.Router()
const { 
    getJobs,
    getAllJobs,
    createJobs,
    updateJobs,
    deleteJobs } = require('../controllers/jobController')

const { protect } = require('../middleware/authMiddleware')


router.get('/', protect, getJobs)
router.post('/', createJobs)
router.get('/all', getAllJobs)
router.route('/:id').put(protect, updateJobs).delete(protect, deleteJobs)


module.exports = router