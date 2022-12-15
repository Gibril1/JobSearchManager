const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    otherName:{
        type: String,
    },
    dob:{
        type: Date,
        required: true
    },
    age:{
        type: String,
        required: true
        
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    cloudinaryId: {
        type: String
    }
    
})

module.exports = mongoose.model('User', userSchema)