const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter the field']
    },
    email: {
        type:String,
        required:[true,'Please enter the field']
    },
    password: {
        type:String,
        required:[true,'Please enter the field']
    },
    image: {
        type:String,
        required:[true,'Please enter the field']
    }
})

module.exports = mongoose.model('User',userSchema)