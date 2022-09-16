const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:5,
        maxLength:40,
        required:true
    },
    email:{
        type:String,
        minLength:5,
        maxLength:40,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    },
    profession:{
        type:String,
        enum:['developer','doctor','lawyer','engineer']
    },
    password:{
        type:String,
        required:true
    },
    publishedAt:{
        type:Date,
        default:Date.now()
    }

})


module.exports = mongoose.model('userAuth', userSchema);