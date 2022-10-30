const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    },
    description:{
        type: String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now(),
        immutable: true
    },

    sucess: {
        type: Boolean,
        default: false
    },

    feedback:{
        type:String,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Interview', interviewSchema)