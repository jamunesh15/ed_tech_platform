


const User = require("../models/Usermodel")
const Course  = require("../models/Course")
const Ratingandreview = require("../models/RatingandReview")
const  mongoose  = require("mongoose")




exports.createratingandreview = async(req,res)=>{
 
   try {
    
    console.log("CREATE RATING REQUEST - Headers:", req.headers.authorization);
    console.log("CREATE RATING REQUEST - User:", req.user);
    console.log("CREATE RATING REQUEST - Body:", req.body);

    // course is user id needed for sure
    const userid = req.user?.id

    // Check if user is authenticated
    if(!userid) {
        return res.status(401).json({
            success:false,
            message:"User not authenticated"
        })
    }

    // fetch data
    const {courseid , rating  , review }  =  req.body

    // check data - validate required fields
    if(!courseid || !rating || !review) {
        return res.status(400).json({
            success:false,
            message:"Course ID, rating, and review are required"
        })
    }

    // validate rating range
    if(rating < 1 || rating > 5) {
        return res.status(400).json({
            success:false,
            message:"Rating must be between 1 and 5"
        })
    }

    // validate ObjectId format
    if(!mongoose.Types.ObjectId.isValid(courseid)) {
        return res.status(400).json({
            success:false,
            message:"Invalid course ID format"
        })
    }

    const courseDetails = await  Course.findOne(
        {_id:courseid  , totalStudent : {$elemMatch : {$eq : userid} }  }
    )

    if(!courseDetails){
        return res.status(404).json({
            success:false,
            message:"Course not found or student not enrolled in this course"
        })
    }

    // check student already give rating and review or not
     
    const alreadyreviewed = await Ratingandreview.findOne({
        user:userid , course:courseid
    })

    if(alreadyreviewed){
        return res.status(400).json({
            success:false,
            message:"you already reviewed this course"
        })
    }

    // create rating and review

    const ratereviewdetails = await Ratingandreview.create({
        rating,
        review , 
        course:courseid ,
        user:userid
    })

    // updating course
   await Course.findByIdAndUpdate({_id:courseid} , 

       {
        $push:{
            ratingAndReviews:ratereviewdetails._id
        }
       },
       {new:true}
         
   )

   // return response
  return res.status(200).json({
    success:true,
    message:"Rating and review given successfully",
    data: ratereviewdetails
  })
    
   } catch (error) {
     console.log("Error while giving rating and review", error);
     return res.status(500).json({
        success:false,
        message:"Something went wrong while reviewing course",
        error: error.message
     })
     
   }

}





 // get average ratings

 exports.getavgrating = async(req,res)=>{

  try {

    // get course id
    const  courseId = req.body.courseId

    // calcuate average
    const result = await Ratingandreview.aggregate([

         // aggregate funtion returns an array 
        {
            $match:{
                course:new mongoose.Types.ObjectId(courseId)
            },

        },

        {

        $group:{
            _id:null , 
            // this is syntax
            averagerating: { $avg: "$rating" }
        }
               
        }
    ])

    // return response

    if(result.length > 0){
        return res.status(200).json({
            success:true,
            message:"avg rating got successfullr",
            averagerating: result[0].averagerating

        })
    }

    // if no rating

    return res.status(200).json({
        success:true,
        message:"no ratings given till now",
        averagerating : 0
    })


    
  } catch (error) {
     console.log("error while getting average ratings", error);
     return res.status(500).json({
        success:false,
        message:"Something went wrong while fetching average rating and reviews"
     })
     
  }

 }


  // get all ratings

  exports.getallratings = async(req,res)=>{

  try {

    const all_ratings = await Ratingandreview.find({})
    .sort({rating:"desc"})
    .populate({
        path:"user",
        select:"firstname lastname email image"
    })
    .populate({
        path:"course",
        select:"courseName"
    })
    .exec()

     
    res.status(200).json({
        success:true,
        message:"All rating find succesfully",
        data:all_ratings
    })


    
    
  } catch (error) {
     console.log("error while getting allratings", error);
     return res.status(500).json({
        success:false,
        message:"Something went wrong while fetching all rating and reviews"
     })
     
  }

 }


 // Get all ratings and reviews for a SPECIFIC COURSE
exports.getCourseRatings = async (req, res) => {
  try {
    const { courseId } = req.body; // or req.params if using route params

    // Validate courseId
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing courseId",
      });
    }

    // Check if the course exists
    const courseExists = await Course.find({ _id: courseId });
    if (!courseExists) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Fetch all ratings for this course (sorted by newest first)
    const courseRatings = await Ratingandreview.find({ course: courseId })
      .sort({ createdAt: -1 }) // Newest reviews first
      .populate({
        path: "user",
        select: "firstname lastname email image", // User details
      })
      .exec();

    // Calculate average rating (optional)
    const avgRatingResult = await Ratingandreview.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      { $group: { _id: null, averageRating: { $avg: "$rating" } } },
    ]);

    const averageRating = avgRatingResult[0]?.averageRating || 0;

    return res.status(200).json({
      success: true,
      message: "Course ratings fetched successfully",
      data: {
        ratings: courseRatings,
        averageRating: averageRating,
        totalReviews: courseRatings.length,
      },
    });

  } catch (error) {
    console.error("Error fetching course ratings:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course ratings",
      error: error.message,
    });
  }
};