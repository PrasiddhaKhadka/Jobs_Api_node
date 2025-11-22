const mongoose = require('mongoose')


const JobSchema = mongoose.Schema({
    company:{
        type:String,
        required:[true,'Please enter the company name'],
        maxlength:50,
    },
    postion:{
        type:String,
        required:[true,'Please provide position'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['interview','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'Auth',
        required:[true,'Please Provide User']
    }  
},
{
    timestamps:true
})

module.exports = mongoose.model('Job',JobSchema);