const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')

const { registerUser,
        loginUser, 
        getUser ,
        getUsers
    } = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', upload.single('image'), registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)
router.get('/all', getUsers)


module.exports = router
