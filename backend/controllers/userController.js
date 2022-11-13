const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Register User
// @routes POST /api/users/
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const { 
            firstName, 
            lastName, 
            otherName, 
            dob, 
            age, 
            email, 
            password 
        } = req.body

    if( 
        !firstName 
        || !lastName 
        || !otherName 
        || !dob 
        || !age 
        || !email 
        || !password
        ) {
        res.status(400)
        throw new Error('Please enter all fields')
    }

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
        firstName,
        lastName,
        otherName,
        dob,
        age,
        email,
        password:hashedPassword
    })

    if (user) {
        res.status(200).json({
            _id: user.id,
            firstName,
            email,
            token: generateToken(user._id)
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
    const { email, password } = req.body

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
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get User
// @routes POST /api/users/me
// @access Private
const getUser = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

const generateToken = ( id ) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getUsers
}