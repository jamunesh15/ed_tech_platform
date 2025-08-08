

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

  firstname:{
    type:String,
    required:true,
    trim:true
  },

  lastname:{
     type:String,
    required:true,
    trim:true
  },
  email:{
     type:String,
    required:true,
    trim:true
  },

  password:{
     type:String,     
     required:true
  },

 

  accountType:{
    type:String,
    enum:["Admin" , "Student" , "Instructor"],
    required:true

  },


  additionalDetails:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Profile"
  },

  courses:[
    
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }

  ],

  image:{
    type:String,
    required:true
  },

  token:{
    type:String
  },

  resetpasswordExpire:{
    type:Date
  },


  courseprogress:[

      {
        type:mongoose.Schema.Types.ObjectId,
        res:"CourseProgress"
      }
  ],

  schedulefordeleteaccount:{
    type:Boolean,
    default:false
  },
  
    deletiondate:{
      type:Date,
      default:null
    }  
  
      
})

  module.exports  = mongoose.model("User" , UserSchema);