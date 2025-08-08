

const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  
  courseName:{
    type:String
  },

  courseDescription:{
    type:String
  },

  instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  whatYouWillLearn:{
    type:String
  },

courseContent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section"
  }],

	instructions: {
		type: [String],
	},


  ratingAndReviews:[
      { 
           type:mongoose.Schema.Types.ObjectId,
           ref:"RatingandReviews"
      }
  ],

  price:{
    type:Number
  },

  thumbnail:{
    type:String
  },
  tag:{
    type:[String],
   required:true
  },  

  totalStudent:[
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
  ],
  category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},

  status:{
    type:String,
    enum : ["Draft" , "Published"]
  }
      
})

  module.exports  = mongoose.model("Course" , CourseSchema);