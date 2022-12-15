const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const cloudinary = require('../utils/cloudinary')

// @desc Register User
// @routes POST /api/users/
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    // checks the request body
    if(!req.body){
        res.status(404)
        throw new Error('Enter all fields')
    }

    // uploads image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path)

    const { email, password } = req.body

    // check if user exists
    const userExists = await User.findOne({ email })

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        otherName: req.body.otherName,
        dob: req.body.dob,
        age: req.body.age,
        email: req.body.email,
        password:hashedPassword,
        avatar: result.secure_url,
        cloudinaryId: result.public_id
    })

    if (user) {
        res.status(200).json({
            'message':`User with name ${req.body.firstName} has been created.`
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Login User
// @routes POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
    // object destructuring
    const { email, password } = req.body

    // checking if email and password are supplied by user
    if(!email || !password){
        res.status(400)
        throw new Error('Please enter your data')
    }

    // check if user exists
    const user = await User.findOne({ email })


    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get User
// @routes GET /api/users/me
// @access Private
const getUser = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})


// @desc Get all Users
// @routes GET /api/users/all
// @access Private
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})


// @desc generates token every time users logs in 
// @usage for authentication and authorization purposes
const generateToken = ( id ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getUsers
}