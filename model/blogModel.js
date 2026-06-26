const mongoose = require('mongoose');
const Users = require('./userModel')

let commentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    text:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

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
  },
  comments:[commentSchema],
 likes: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }
  ],
},{timestamps: true})


let Blogs = mongoose.model("blogs",blogSchema); 
module.exports = Blogs;