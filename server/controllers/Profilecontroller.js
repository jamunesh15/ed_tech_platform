

// const User = require("../models/Usermodel")
// const Profile = require("../models/Profilemodel")
// const { uploadImagetocloudinary } = require("../utils/imageUpload")
// const Course = require("../models/Course")

// // updateprofile controller



// exports.updateProfile = async (req, res) => {
//   try {
//     console.log("Update profile request body:", req.body)
    
//     const {
//       firstname,
//       lastname,
//       dateOfBirth,
//       about,
//       contactNumber,
//       gender
//     } = req.body

//     const userId = req.user.id

//     // Validate required fields
//     if (!firstname || !lastname) {
//       return res.status(400).json({
//         success: false,
//         message: "First name and last name are required"
//       })
//     }

//     // Update user's basic info (firstname, lastname)
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { 
//         firstname: firstname.trim(), 
//         lastname: lastname.trim() 
//       },
//       { new: true }
//     ).select("-password")

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       })
//     }

//     console.log("User updated:", updatedUser)

//     // Update profile details
//     let profile = await Profile.findById(updatedUser.additionalDetails)
    
//     if (!profile) {
//       // Create new profile if doesn't exist
//       profile = new Profile({
//         dateOfBirth: dateOfBirth || null,
//         about: about || null,
//         contactNumber: contactNumber || null,
//         gender: gender || null
//       })
//       await profile.save()
      
//       // Update user with new profile ID
//       updatedUser.additionalDetails = profile._id
//       await updatedUser.save()
//     } else {
//       // Update existing profile
//       if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth
//       if (about !== undefined) profile.about = about
//       if (contactNumber !== undefined) profile.contactNumber = contactNumber
//       if (gender !== undefined) profile.gender = gender

//       await profile.save()
//     }

//     console.log("Profile updated:", profile)

//     // Get the final updated user with populated profile
//     const finalUser = await User.findById(userId)
//       .populate("additionalDetails")
//       .select("-password")

//     console.log("Final user with profile:", finalUser)

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       updatedUserDetails: finalUser
//     })

//   } catch (error) {
//     console.error("Error updating profile:", error)
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error while updating profile"
//     })
//   }
// }

// // delete acocunt
// exports.deleteAccount = async (req, res) => {
// 	try {
// 		// TODO: Find More on Job Schedule
// 		// const job = schedule.scheduleJob("10 * * * * *", function () {
// 		// 	console.log("The answer to life, the universe, and everything!");
// 		// });
// 		// console.log(job);
// 		console.log("Printing ID: ", req.user.id);
// 		const id = req.user.id;
		
// 		const user = await User.findById({ _id: id });
// 		if (!user) {
// 			return res.status(404).json({
// 				success: false,
// 				message: "User not found",
// 			});
// 		}
// 		// Delete Assosiated Profile with the User
// 		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
// 		// TODO: Unenroll User From All the Enrolled Courses
// 		// Now Delete User
// 		await User.findByIdAndDelete({ _id: id });
// 		res.status(200).json({
// 			success: true,
// 			message: "User deleted successfully",
// 		});
// 	} catch (error) {
// 		console.log(error);
// 		res
// 			.status(500)
// 			.json({ success: false, message: "User Cannot be deleted successfully" });
// 	}
// };

// // get all users

// exports.getAllUserDetails = async (req, res) => {
//   try {
//     const id = req.user.id;
//     const userDetails = await User.findById(id)
//       .populate("additionalDetails")
//       .exec();
//     console.log(userDetails);
//     res.status(200).json({
//       success: true,
//       message: "User Data fetched successfully",
//       data: userDetails,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // update profile picture

// exports.updateDisplayPicture = async (req, res) => {
//     try {
//         console.log("Files received:", req.files);
//         console.log("User from auth:", req.user);
        
//         // Check if file is uploaded
//         if (!req.files || !req.files.displayPicture) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No display picture file uploaded"
//             });
//         }

//         const displayPicture = req.files.displayPicture;
//         console.log("Display picture details:", {
//             name: displayPicture.name,
//             size: displayPicture.size,
//             mimetype: displayPicture.mimetype
//         });

//         // Validate file type
//         if (!displayPicture.mimetype.startsWith('image/')) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please upload a valid image file"
//             });
//         }

//         // Validate file size (5MB)
//         if (displayPicture.size > 5 * 1024 * 1024) {
//             return res.status(400).json({
//                 success: false,
//                 message: "File size too large. Maximum 5MB allowed"
//             });
//         }

//         // Check if user exists
//         if (!req.user || !req.user.id) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User not authenticated"
//             });
//         }

//         const userId = req.user.id;

//         // Upload image to Cloudinary
//         console.log("Uploading to Cloudinary...");
//         const image = await uploadImagetocloudinary(
//             displayPicture,
//             process.env.FOLDER_NAME || 'profile_pictures',
//             1000,
//             1000
//         );

//         console.log("Cloudinary upload result:", image);

//         // Update user's image URL
//         const updatedUserDetails = await User.findByIdAndUpdate(
//             userId,
//             { image: image.secure_url },
//             { new: true }
//         ).select('-password');

//         if (!updatedUserDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         console.log("User updated successfully:", updatedUserDetails);

//         return res.status(200).json({
//             success: true,
//             message: "Profile picture updated successfully",
//             data: updatedUserDetails
//         });

//     } catch (error) {
//         console.error("Error updating display picture:", error);
//         return res.status(500).json({
//             success: false,
//             message: error.message || "Internal server error while updating profile picture"
//         });
//     }
// };


// exports.getEnrolledCourses = async (req, res) => {
//     try {
//       // Get userId from req.user (set by auth middleware) instead of req.body
//       const userId = req.user.id
      
//       const userDetails = await User.findOne({
//         _id: userId,
//       })
//         .populate({
//           path: "courses",
//           populate: {
//             path: "courseContent",
//             populate: {
//               path: "Subsection"
//             }
//           }
//         })
//         .exec()
        
//       if (!userDetails) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find user with id: ${userId}`,
//         })
//       }

//       // Calculate progress for each enrolled course
//       const coursesWithProgress = await Promise.all(
//         userDetails.courses.map(async (course) => {
//           try {
//             // Find course progress for this specific course
//             const courseProgress = await require("../models/Courseprogress").findOne({
//               courseID: course._id,
//               userId: userId,
//             })

//             // Calculate total lectures in the course
//             let totalLectures = 0
//             let totalDurationSeconds = 0
//             course.courseContent?.forEach((section) => {
//               totalLectures += section.Subsection?.length || 0
//               // Calculate total duration from all subsections
//               section.Subsection?.forEach((subsection) => {
//                 if (subsection.timeDuration) {
//                   // Convert time duration to seconds if it's in MM:SS or HH:MM:SS format
//                   const duration = subsection.timeDuration
//                   if (typeof duration === 'string') {
//                     const parts = duration.split(':')
//                     if (parts.length === 2) {
//                       // MM:SS format
//                       totalDurationSeconds += parseInt(parts[0]) * 60 + parseInt(parts[1])
//                     } else if (parts.length === 3) {
//                       // HH:MM:SS format
//                       totalDurationSeconds += parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
//                     }
//                   } else if (typeof duration === 'number') {
//                     // If it's already in seconds
//                     totalDurationSeconds += duration
//                   }
//                 }
//               })
//             })

//             // Format duration into readable format
//             const formatDuration = (seconds) => {
//               if (seconds < 60) {
//                 return `${seconds}s`
//               } else if (seconds < 3600) {
//                 const minutes = Math.floor(seconds / 60)
//                 const remainingSeconds = seconds % 60
//                 return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
//               } else {
//                 const hours = Math.floor(seconds / 3600)
//                 const minutes = Math.floor((seconds % 3600) / 60)
//                 return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
//               }
//             }

//             // Calculate progress percentage
//             let progressPercentage = 0
//             if (courseProgress && totalLectures > 0) {
//               progressPercentage = Math.round(
//                 (courseProgress.completedVideos.length / totalLectures) * 100
//               )
//             }

//             // Return course with progress
//             return {
//               ...course.toObject(),
//               progressPercentage: progressPercentage,
//               totalLectures: totalLectures,
//               completedLectures: courseProgress?.completedVideos?.length || 0,
//               courseDuration: formatDuration(totalDurationSeconds),
//               totalDurationSeconds: totalDurationSeconds
//             }
//           } catch (error) {
//             console.error(`Error calculating progress for course ${course._id}:`, error)
//             // Return course with 0 progress if error occurs
//             return {
//               ...course.toObject(),
//               progressPercentage: 0,
//               totalLectures: 0,
//               completedLectures: 0,
//               courseDuration: "0m",
//               totalDurationSeconds: 0
//             }
//           }
//         })
//       )

//       return res.status(200).json({
//         success: true,
//         data: coursesWithProgress,
//       })
//     } catch (error) {
//       console.error("Error in getEnrolledCourses:", error)
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
// };


// exports.instrctordashboard = async(req,res)=>{
    
//   try {

//    const courseDetails = await Course.find({ instructor: req.user.id });

//    if (!courseDetails) {
//      return res.status(404).json({
//        success: false,
//        message: "No courses found for this instructor",
//      });
//    }

//    const courseData = courseDetails.map((course)=>{
//     const totalstudentsEnrolled = course.totalStudent.length;
//     const totalAmountgenerated = course.price * totalstudentsEnrolled;
   
   
//      const courseDatawithstats = {
//      _id : course._id,
//      courseNmae: course.courseName,
//      courseDescription: course.courseDescription,
//      totalstudentsEnrolled,
//       totalAmountgenerated
     
//    }

//    return courseDatawithstats;

//    })
  
//    return res.status(200).json(
//       {
//         success: true,
//         courses: courseData,
//       }
//    )
  
//   } catch (error) {
//     console.error("Error in instructor dashboard:", error);
//     return res.status(500).json({
//       success: false,
//       error: error.message ,
//       message: "Internal server error while fetching instructor dashboard"
//     });
    
//   }

// }






const User = require("../models/Usermodel")
const Profile = require("../models/Profilemodel")
const { uploadImagetocloudinary } = require("../utils/imageUpload")
const Course = require("../models/Course")

// updateprofile controller



exports.updateProfile = async (req, res) => {
  try {
    console.log("Update profile request body:", req.body)
    
    const {
      firstname,
      lastname,
      dateOfBirth,
      about,
      contactNumber,
      gender
    } = req.body

    const userId = req.user.id

    // Validate required fields
    if (!firstname || !lastname) {
      return res.status(400).json({
        success: false,
        message: "First name and last name are required"
      })
    }

    // Update user's basic info (firstname, lastname)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        firstname: firstname.trim(), 
        lastname: lastname.trim() 
      },
      { new: true }
    ).select("-password")

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    console.log("User updated:", updatedUser)

    // Update profile details
    let profile = await Profile.findById(updatedUser.additionalDetails)
    
    if (!profile) {
      // Create new profile if doesn't exist
      profile = new Profile({
        dateOfBirth: dateOfBirth || null,
        about: about || null,
        contactNumber: contactNumber || null,
        gender: gender || null
      })
      await profile.save()
      
      // Update user with new profile ID
      updatedUser.additionalDetails = profile._id
      await updatedUser.save()
    } else {
      // Update existing profile
      if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth
      if (about !== undefined) profile.about = about
      if (contactNumber !== undefined) profile.contactNumber = contactNumber
      if (gender !== undefined) profile.gender = gender

      await profile.save()
    }

    console.log("Profile updated:", profile)

    // Get the final updated user with populated profile
    const finalUser = await User.findById(userId)
      .populate("additionalDetails")
      .select("-password")

    console.log("Final user with profile:", finalUser)

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails: finalUser
    })

  } catch (error) {
    console.error("Error updating profile:", error)
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error while updating profile"
    })
  }
}

// delete acocunt
exports.deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		// TODO: Unenroll User From All the Enrolled Courses
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

// get all users

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// update profile picture

exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("Files received:", req.files);
        console.log("User from auth:", req.user);
        
        // Check if file is uploaded
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "No display picture file uploaded"
            });
        }

        const displayPicture = req.files.displayPicture;
        console.log("Display picture details:", {
            name: displayPicture.name,
            size: displayPicture.size,
            mimetype: displayPicture.mimetype
        });

        // Validate file type
        if (!displayPicture.mimetype.startsWith('image/')) {
            return res.status(400).json({
                success: false,
                message: "Please upload a valid image file"
            });
        }

        // Validate file size (5MB)
        if (displayPicture.size > 5 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: "File size too large. Maximum 5MB allowed"
            });
        }

        // Check if user exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const userId = req.user.id;

        // Upload image to Cloudinary
        console.log("Uploading to Cloudinary...");
        const image = await uploadImagetocloudinary(
            displayPicture,
            process.env.FOLDER_NAME || 'profile_pictures',
            1000,
            1000
        );

        console.log("Cloudinary upload result:", image);

        // Update user's image URL
        const updatedUserDetails = await User.findByIdAndUpdate(
            userId,
            { image: image.secure_url },
            { new: true }
        ).select('-password');

        if (!updatedUserDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        console.log("User updated successfully:", updatedUserDetails);

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            data: updatedUserDetails
        });

    } catch (error) {
        console.error("Error updating display picture:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error while updating profile picture"
        });
    }
};


exports.getEnrolledCourses = async (req, res) => {
    try {
      // Get userId from req.user (set by auth middleware) instead of req.body
      const userId = req.user.id
      
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "Subsection"
            }
          }
        })
        .exec()
        
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userId}`,
        })
      }

      // Calculate progress for each enrolled course
      const coursesWithProgress = await Promise.all(
        userDetails.courses.map(async (course) => {
          try {
            // Find course progress for this specific course
            const courseProgress = await require("../models/Courseprogress").findOne({
              courseID: course._id,
              userId: userId,
            })

            // Calculate total lectures in the course
            let totalLectures = 0
            let totalDurationSeconds = 0
            course.courseContent?.forEach((section) => {
              totalLectures += section.Subsection?.length || 0
              // Calculate total duration from all subsections
              section.Subsection?.forEach((subsection) => {
                if (subsection.timeDuration) {
                  // Convert time duration to seconds
                  const duration = subsection.timeDuration
                  if (typeof duration === 'string') {
                    // Check if it's in seconds format (just a number as string)
                    if (/^\d+(\.\d+)?$/.test(duration)) {
                      totalDurationSeconds += parseFloat(duration)
                    } else {
                      // Handle MM:SS or HH:MM:SS format
                      const parts = duration.split(':')
                      if (parts.length === 2) {
                        // MM:SS format
                        totalDurationSeconds += parseInt(parts[0]) * 60 + parseInt(parts[1])
                      } else if (parts.length === 3) {
                        // HH:MM:SS format
                        totalDurationSeconds += parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
                      }
                    }
                  } else if (typeof duration === 'number') {
                    // If it's already in seconds
                    totalDurationSeconds += duration
                  }
                }
              })
            })

            // Format duration into readable format
            const formatDuration = (seconds) => {
              if (seconds === 0) {
                return "0s"
              } else if (seconds < 60) {
                return `${Math.round(seconds)}s`
              } else if (seconds < 3600) {
                const minutes = Math.floor(seconds / 60)
                const remainingSeconds = Math.round(seconds % 60)
                return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
              } else {
                const hours = Math.floor(seconds / 3600)
                const minutes = Math.floor((seconds % 3600) / 60)
                return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
              }
            }

            // Calculate progress percentage
            let progressPercentage = 0
            if (courseProgress && totalLectures > 0) {
              progressPercentage = Math.round(
                (courseProgress.completedVideos.length / totalLectures) * 100
              )
            }

            // Return course with progress
            return {
              ...course.toObject(),
              progressPercentage: progressPercentage,
              totalLectures: totalLectures,
              completedLectures: courseProgress?.completedVideos?.length || 0,
              courseDuration: formatDuration(totalDurationSeconds),
              totalDurationSeconds: totalDurationSeconds
            }
          } catch (error) {
            console.error(`Error calculating progress for course ${course._id}:`, error)
            // Return course with 0 progress if error occurs
            return {
              ...course.toObject(),
              progressPercentage: 0,
              totalLectures: 0,
              completedLectures: 0,
              courseDuration: "0m",
              totalDurationSeconds: 0
            }
          }
        })
      )

      return res.status(200).json({
        success: true,
        data: coursesWithProgress,
      })
    } catch (error) {
      console.error("Error in getEnrolledCourses:", error)
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.instrctordashboard = async(req,res)=>{
    
  try {

   const courseDetails = await Course.find({ instructor: req.user.id });

   if (!courseDetails) {
     return res.status(404).json({
       success: false,
       message: "No courses found for this instructor",
     });
   }

   const courseData = courseDetails.map((course)=>{
    const totalstudentsEnrolled = course.totalStudent.length;
    const totalAmountgenerated = course.price * totalstudentsEnrolled;
   
   
     const courseDatawithstats = {
     _id : course._id,
     courseNmae: course.courseName,
     courseDescription: course.courseDescription,
     totalstudentsEnrolled,
      totalAmountgenerated
     
   }

   return courseDatawithstats;

   })
  
   return res.status(200).json(
      {
        success: true,
        courses: courseData,
      }
   )
  
  } catch (error) {
    console.error("Error in instructor dashboard:", error);
    return res.status(500).json({
      success: false,
      error: error.message ,
      message: "Internal server error while fetching instructor dashboard"
    });
    
  }

}
