const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const Course = require("../models/Course");
const { uploadImagetocloudinary } = require("../utils/imageUpload");
require("dotenv").config();




// create subsection

// exports.createsubsection = async(req,res)=>{

//  try {


//     // fetch data 
//     const {sectionId ,  title , description } = req.body

//     // fetch video file
//     const video = req.files.videofile


//     // vlaidation 
//     if( !sectionId  || !title  || !description || !video ){
//         return res.status(400).json({
//             success:false,
//             message:"all fields are required" 
//         })
//     }

//     // upload video file to cloudinary

//     const uploadvideo = await uploadImagetocloudinary(video , process.env.FOLDER_NAME);



//     // create subsection
//     const subsectionDetials = await Subsection.create({
//         title:title,
//         // timeDuration:timeDuration,
//         description:description,
//         videoUrl:uploadvideo.secure_url
//     })


//     // push request to section
//     await Section.findByIdAndUpdate({_id:sectionId },
//     {
//          $push:{
//             Subsection: subsectionDetials._id
//          }
//         },
//         {new:true}
//     ).populate()   // task how to populate in goodway


//     // return response
//     return res.status(200).json({
//         success:true,
//         message:"subsection created successfully",
//         data:subsectionDetials
//     })


    
//  } catch (error) {
//         console.log(error.message);

//       res.status(500).json({
//         success:false,
//         message:"Something went Wrong while creating sebsection"
//       })
//  }

// }


// // update and delete subsection

// // update subsection
// exports.updateSubsection = async(req,res)=>{
//     try {
//         const {subsectionId, title, timeDuration, description} = req.body;
//         const video = req.files.videofile; 

//         // validation
//         if(!subsectionId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Subsection ID is required"
//             })
//         }
        

//         // prepare update data
//         const updateData = {};
//         if(title) updateData.title = title;
//         if(timeDuration) updateData.timeDuration = timeDuration;
//         if(description) updateData.description = description;

//         // if video is being updated
//         if(video){
//             const uploadvideo = await uploadImagetocloudinary(video, process.env.FOLDER_NAME);
//             updateData.videoUrl = uploadvideo.secure_url;
//         }

//         // update subsection
//         const updatedSubsection = await Subsection.findByIdAndUpdate(
//             subsectionId,
//             updateData,
//             {new:true}
//         )

//         return res.status(200).json({
//             success:true,
//             message:"Subsection updated successfully",
//             data:updatedSubsection
//         })

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({
//             success:false,
//             message:"Something went wrong while updating subsection"
//         })
//     }
// }

// // delete subsection
// exports.deleteSubsection = async(req,res)=>{
//     try {
//         const {subsectionId, sectionId} = req.body;

//         // validation
//         if(!subsectionId || !sectionId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Subsection ID and Section ID are required"
//             })
//         }

//         // delete subsection
//         await Subsection.findByIdAndDelete(subsectionId);

//         // remove subsection reference from section
//         await Section.findByIdAndUpdate(
//             sectionId,
//             {$pull: {subSection: subsectionId}},
//             {new:true}
//         )
        
//         return res.status(200).json({
//             success:true,
//             message:"Subsection deleted successfully"
//         })

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({
//             success:false,
//             message:"Something went wrong while deleting subsection"
//         })
//     }
// }




// Create Subsection
// 

// exports.createsubsection = async(req, res) => {
//   try {
//     const { sectionId, title, description } = req.body;
//     const video = req.files?.video; // Changed from 'videofile' to 'video'

//     if (!sectionId || !title || !description || !video) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required" 
//       });
//     }

//     // Get courseId from section
//     const section = await Section.findById(sectionId);
//     if (!section) {
//       return res.status(404).json({
//         success: false,
//         message: "Section not found"
//       });
//     }

//     // Upload video
//     const uploadvideo = await uploadImagetocloudinary(video, process.env.FOLDER_NAME);

//     // Create subsection
//     const subsectionDetails = await Subsection.create({
//       title,
//       description,
//       videoUrl: uploadvideo.secure_url
//     });

//     // Update section
//     const updatedSection = await Section.findByIdAndUpdate(
//       sectionId,
//       { $push: { Subsection: subsectionDetails._id } },
//       { new: true }
//     ).populate("Subsection");

//     // Get full course data
//     const updatedCourse = await Course.findById(section.courseId)
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "Subsection"
//         }
//       });

//     return res.status(200).json({
//       success: true,
//       message: "Subsection created successfully",
//       data: updatedCourse
//     });
    
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal server error"
//     });
//   }
// }


// Make sure you have these imports at the top of your file



// exports.createsubsection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body;
//     const video = req.files?.video;

//     if (!sectionId || !title || !description || !video) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//       });
//     }

//     // Get the section first
//     const section = await Section.findById(sectionId);
//     if (!section) {
//       return res.status(404).json({
//         success: false,
//         message: "Section not found"
//       });
//     }   

//     // Upload video
//     const uploadvideo = await uploadImagetocloudinary(video, process.env.FOLDER_NAME);

//     // Create subsection
//     const subsectionDetails = await Subsection.create({
//       title,
//       description,
//       videoUrl: uploadvideo.secure_url
//     });

//     // Update section with new subsection
//     const updatedSection = await Section.findByIdAndUpdate(
//       sectionId,
//       { $push: { Subsection: subsectionDetails._id } },
//       { new: true }
//     ).populate("Subsection");

//     // Verify the section has a courseId before proceeding
//     if (!section.courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Section is not associated with any course"
//       });
//     }

//     // Get full course data
//     const updatedCourse = await Course.findById(section.courseId)
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "Subsection"
//         }
//       })
//       .exec();

//     return res.status(200).json({
//       success: true,
//       message: "Subsection created successfully",
//       data: updatedCourse
//     });

//   } catch (error) {   
//     console.error("Error in createsubsection:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.stack
//     });
//   }

// };

// exports.createsubsection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body;
//     const video = req.files?.video;

//     // Validate input
//     if (!sectionId || !title || !description || !video) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Check if section exists and has courseId
//     const section = await Section.findById(sectionId);
//     if (!section) {
//       return res.status(404).json({
//         success: false,
//         message: "Section not found",
//       });
//     }

//     if (!section.courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Section is not associated with any course. Please edit the section first.",
//       });
//     }

//     // Upload video
//     const uploadDetails = await uploadImagetocloudinary(
//       Array.isArray(video) ? video[0] : video,
//       process.env.FOLDER_NAME
//     );

//     // Create subsection
//     const subsection = await Subsection.create({
//       title,
//       description,
//       videoUrl: uploadDetails.secure_url,
//       // duration: uploadDetails.duration || 0,
//     });

//     // Update section with new subsection
//     const updatedSection = await Section.findByIdAndUpdate(
//       sectionId,
//       { $push: { Subsection: subsection._id } },
//       { new: true }
//     ).populate("Subsection");

//     // Get updated course with populated data
//     const updatedCourse = await Course.findById(section.courseId)
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "Subsection",
//         },
//       })
//       .exec();

//     return res.status(200).json({
//       success: true,
//       message: "Subsection created successfully",
//       data: updatedCourse,
//     });
//   } catch (error) {
//     console.error("Error creating subsection:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.stack
//     });
//   }
// };




exports.createsubsection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { sectionId, title, description } = req.body;
    const video = req.files.video;

    // Check if all necessary fields are provided
    if (!sectionId || !title || !description || !video) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }

    // First find the section and verify it exists
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found"
      });
    }

    // Upload the video file to Cloudinary
    const uploadDetails = await uploadImagetocloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // Create a new sub-section with the necessary information
    const SubSectionDetails = await Subsection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { Subsection: SubSectionDetails._id } },
      { new: true }
    ).populate("Subsection");

    // Get the course if section has courseId
    let response = { updatedSection };
    if (section.courseId) {
      const updatedCourse = await Course.findById(section.courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "Subsection"
          }
        });
      if (updatedCourse) {
        response.updatedCourse = updatedCourse;
      }
    }

    // Return the updated data
    return res.status(200).json({ 
      success: true, 
      message: "Subsection created successfully",
      data: response.updatedCourse || response.updatedSection
    })
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// Update Subsection
// exports.updateSubsection = async(req, res) => {
//   try {
//     const { subsectionId, sectionId, courseId, title, description } = req.body;
//     const video = req.files?.videofile;

//     if (!subsectionId || !sectionId || !courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Required IDs are missing"
//       });
//     }

//     // Prepare update data
//     const updateData = {};
//     if (title) updateData.title = title;
//     if (description) updateData.description = description;

//     // Handle video update
//     if (video) {
//       const uploadvideo = await uploadImagetocloudinary(video, process.env.FOLDER_NAME);
//       updateData.videoUrl = uploadvideo.secure_url;
//     }

//     // Update subsection
//     await Subsection.findByIdAndUpdate(subsectionId, updateData, { new: true });

//     // Get full updated course
//     const updatedCourse = await Course.findById(courseId)
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "Subsection"
//         }
//       });

//     return res.status(200).json({
//       success: true,
//       message: "Subsection updated successfully",
//       data: updatedCourse
//     });

//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// }


// exports.createsubsection = async (req, res) => {
//   try {
//     const { sectionId, title, description } = req.body;
//     const video = req.files.video;

//     console.log("Received create subsection request:", {
//       sectionId,
//       title,
//       description,
//       video
//     });

//     // Validate required fields
//     if (!sectionId || !title || !description || !video) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields including video are required",
//         missingFields: {
//           sectionId: !sectionId,
//           title: !title,
//           description: !description,
//           video: !video
//         }
//       });
//     }

//     // Validate video file
//     const supportedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
//     if (!supportedVideoTypes.includes(video.mimetype)) {
//       return res.status(400).json({
//         success: false,
//         message: "Unsupported video format. Please upload MP4, WebM, or Ogg"
//       });
//     }

//     // Upload video to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(video.tempFilePath, {
//       folder: process.env.FOLDER_NAME,
//       resource_type: "video",
//       chunk_size: 6000000 // 6MB chunks for large files
//     });

//     // Clean up temp file
//     fs.unlinkSync(video.tempFilePath);

//     // Create subsection
//     const subsection = await Subsection.create({
//       title,
//       description,
//       videoUrl: uploadResult.secure_url,
//       duration: Math.round(uploadResult.duration) || 0
//     });

//     // Update section with new subsection
//     const updatedSection = await Section.findByIdAndUpdate(
//       sectionId,
//       { $push: { Subsection: subsection._id } },
//       { new: true }
//     ).populate("Subsection");

//     if (!updatedSection) {
//       return res.status(404).json({
//         success: false,
//         message: "Section not found"
//       });
//     }

//     // Get full updated course
//     const updatedCourse = await Course.findById(updatedSection.courseId)
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "Subsection"
//         }
//       })
//       .exec();

//     return res.status(201).json({
//       success: true,
//       message: "Lecture created successfully",
//       data: updatedCourse
//     });

//   } catch (error) {
//     console.error("Error creating subsection:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to create lecture",
//       error: error.stack
//     });
//   }
// };

// exports.updatesubsection = async (req, res) => {
//   try {
//     const { sectionId, subSectionId } = req.body;
//     const { title, description } = req.body;
//     const video = req.files?.video;

//     console.log("Received update subsection request:", {
//       sectionId,
//       subSectionId,
//       title,
//       description,
//       hasVideo: !!video
//     });

//     // Validate at least one field is being updated
//     if (!title && !description && !video) {
//       return res.status(400).json({
//         success: false,
//         message: "No changes provided to update"
//       });
//     }

//     // Find existing subsection
//     const subsection = await Subsection.findById(subSectionId);
//     if (!subsection) {
//       return res.status(404).json({
//         success: false,
//         message: "Lecture not found"
//       });
//     }

//     // Prepare update data
//     const updateData = {};
//     if (title) updateData.title = title;
//     if (description) updateData.description = description;

//     // Handle video update if provided
//     if (video) {
//       // Validate video file
//       const supportedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
//       if (!supportedVideoTypes.includes(video.mimetype)) {
//         return res.status(400).json({
//           success: false,
//           message: "Unsupported video format. Please upload MP4, WebM, or Ogg"
//         });
//       }

//       // Upload new video
//       const uploadResult = await cloudinary.uploader.upload(video.tempFilePath, {
//         folder: process.env.FOLDER_NAME,
//         resource_type: "video"
//       });

//       // Clean up temp file
//       fs.unlinkSync(video.tempFilePath);

//       updateData.videoUrl = uploadResult.secure_url;
//       updateData.duration = Math.round(uploadResult.duration) || 0;
//     }

//     // Update subsection
//     const updatedSubsection = await Subsection.findByIdAndUpdate(
//       subSectionId,
//       updateData,
//       { new: true }
//     );

//     // Get full updated course
//     const updatedCourse = await Course.findOne({ "courseContent": sectionId })
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "Subsection"
//         }
//       })
//       .exec();

//     return res.status(200).json({
//       success: true,
//       message: "Lecture updated successfully",
//       data: updatedCourse
//     });

//   } catch (error) {
//     console.error("Error updating subsection:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to update lecture",
//       error: error.stack
//     });
//   }
// };

// // Delete Subsection
// exports.deleteSubsection = async(req, res) => {
//   try {
//     const { subsectionId, sectionId, courseId } = req.body;

//     if (!subsectionId || !sectionId || !courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Required IDs are missing"
//       });
//     }

//     // Delete subsection
//     await Subsection.findByIdAndDelete(subsectionId);

//     // Remove from section
//     await Section.findByIdAndUpdate(
//       sectionId,
//       { $pull: { Subsection: subsectionId } },
//       { new: true }
//     );

//     // Get full updated course
//     const updatedCourse = await Course.findById(courseId)
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "Subsection"
//         }
//       });

//     return res.status(200).json({
//       success: true,
//       message: "Subsection deleted successfully",
//       data: updatedCourse
//     });

//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// }




// exports.updatesubsection = async (req, res) => {
//   try {
//     const { sectionId, SubsectionId, title, description, courseId } = req.body;
//     console.log("Update request received:", { sectionId, SubsectionId, title, description, courseId });

//     // Validate required fields
//     if (!sectionId || !SubsectionId || !courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Section ID, Subsection ID, and Course ID are required",
//       });
//     }

//     // Find the subsection
//     const subsection = await Subsection.findById(SubsectionId);
//     if (!subsection) {
//       return res.status(404).json({
//         success: false,
//         message: "Subsection not found",
//       });
//     }

//     // Update fields if provided
//     if (title !== undefined) {
//       subsection.title = title;
//     }
//     if (description !== undefined) {
//       subsection.description = description;
//     }

//     // Handle video update if provided
//     if (req.files && req.files.video) {
//       const video = req.files.video;
//       const uploadDetails = await uploadImagetocloudinary(
//         video,
//         process.env.FOLDER_NAME
//       );
//       subsection.videoUrl = uploadDetails.secure_url;
//       subsection.timeDuration = `${uploadDetails.duration}`;
//     }

//     // Save the updated subsection
//     await subsection.save();

//     // Find the updated section with populated subsections
//     const updatedSection = await Section.findById(sectionId).populate({
//       path: "Subsection",
//       model: "Subsection"
//     });

//     if (!updatedSection) {
//       return res.status(404).json({
//         success: false,
//         message: "Section not found",
//       });
//     }

//     // Get the full updated course
//     const updatedCourse = await Course.findById(courseId)
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "Subsection"
//         }
//       });

//     if (!updatedCourse) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     // Send response with both updated course and section
//     return res.json({
//       success: true,
//       message: "Subsection updated successfully",
//       data: updatedCourse
//     });
//   } catch (error) {
//     console.error("Error in updatesubsection:", error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while updating the subsection",
//       error: error.message,
//     });
//   }
// }

exports.updatesubsection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description, courseId } = req.body;
    console.log("Update request received:", { sectionId, subSectionId, title, description, courseId });

    // Validate required fields
    if (!sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and Subsection ID are required",
      });
    }

    // Find the subsection
    const subsection = await Subsection.findById(subSectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Update fields if provided
    if (title !== undefined) {
      subsection.title = title;
    }
    if (description !== undefined) {
      subsection.description = description;
    }

    // Handle video update if provided
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImagetocloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subsection.videoUrl = uploadDetails.secure_url;
      subsection.timeDuration = `${uploadDetails.duration}`;
    }

    // Save the updated subsection
    await subsection.save();

    // Find the updated section with populated subsections
    const updatedSection = await Section.findById(sectionId).populate({
      path: "Subsection",
      model: "Subsection"
    });

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Get the full updated course if courseId is provided
    let updatedCourse = null;
    if (courseId) {
      updatedCourse = await Course.findById(courseId).populate({
        path: "courseContent",
        populate: {
          path: "Subsection"
        }
      });
    }

    // Send response with both updated course and section
    return res.json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedCourse || updatedSection,
    });
  } catch (error) {
    console.error("Error in updatesubsection:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the subsection",
      error: error.message,
    });
  }
}


exports.deletesubsection = async (req, res) => {
  try {
    const { subSectionId, sectionId, courseId } = req.body;
    console.log("Delete request received:", { subSectionId, sectionId, courseId });

    // Input validation
    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID and Section ID are required"
      });
    }

    // First find the section to ensure it exists
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found"
      });
    }

    // Then find and delete the subsection
    const deletedSubsection = await Subsection.findByIdAndDelete(subSectionId);
    if (!deletedSubsection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found"
      });
    }

    // Update section by removing subsection reference
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: {
          Subsection: subSectionId
        }
      },
      { 
        new: true,
        runValidators: true
      }
    ).populate("Subsection");

    // If courseId is provided, get and return the full course data
    if (courseId) {
      const updatedCourse = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "Subsection"
          }
        });

      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedCourse
      });
    }

    // If no courseId, return the updated section
    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection
    });

  } catch (error) {
    console.error("Error in deletesubsection:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
      error: error.message
    });
  }
};
