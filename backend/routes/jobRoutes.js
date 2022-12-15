const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')

const { 
    createJobs,
    getJobs, 
    getJob,
    updateJobs, 
    deleteJobs 
} = require('../controllers/jobController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, upload.single('image'), createJobs)
router.get('/:id', protect, getJob)
router.get('/', protect, getJobs)
router.put('/', protect,  updateJobs)
router.delete('/:id', protect, deleteJobs)


module.exports = router