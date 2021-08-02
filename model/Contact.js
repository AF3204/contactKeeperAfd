const mongoose = require('mongoose')

// 20210802: user-> User table 
const ContactSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
    },
    type:{
        type:String,
        default:'Personal'
    },
    date:{
        type: Date,
        default:Date.now
    },
})

module.exports = mongoose.model('contact', ContactSchema)