const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jobSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },
    name:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    jobPosition:{
        type:String,
        required: true
    },
    cv:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Jobs', jobSchema)





