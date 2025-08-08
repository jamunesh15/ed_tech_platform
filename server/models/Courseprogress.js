

const mongoose = require('mongoose')

const CourseprogrssSchema = new mongoose.Schema({
  
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },

    completedVideos:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subsection"
        }
 
    ]
      
})

  module.exports  = mongoose.model("CourseProgress" , CourseprogrssSchema);