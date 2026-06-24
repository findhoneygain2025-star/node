const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
   name:{
    type:String,
    minLength:3,
    maxLength:20,
    required:true
   },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,

    }
})






let Users = mongoose.model("users",userSchema); 

module.exports = Users;