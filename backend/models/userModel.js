const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name:{
        type: String,
        required: [true, 'Please enter your name']
    },
    last_name:{
        type: String,
        required: [true, 'Please enter your name']
    },
    other_name:{
        type: String,
    },
    dob:{
        type: Date,
        required: [true, 'Please enter your name']
    },
    age:{
        type: String,
        required: [true, 'Please enter your name'],
        
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please enter your name'],
    },
    password:{
        type: String,
        required: [true, 'Please enter your name']
    }
    
})

module.exports = mongoose.model('User', userSchema)