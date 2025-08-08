

const mongoose = require('mongoose')

const RatingandReviewSchema = new mongoose.Schema({
  
user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
},

course:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Course"
},

rating:{
    type:Number,
    required:true
}, 

review:{
    type:String,
    required:true
} 

//  will add total rating and total reviews  : comment  for remember
      
}, {
    timestamps: true
})

  module.exports  = mongoose.model("RatingandReviews" , RatingandReviewSchema);



 