const mongoose = require('mongoose');
const Users = require('./userModel')

let blogSchema = new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
    content:{
        type:String,
        required:true,
    },
   image:{
        type:String,
    },
    author:{
        type:String,
        required:true
    },
    createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users',
    required: true 
  }
})


let Blogs = mongoose.model("blogs",blogSchema); 

module.exports = Blogs;