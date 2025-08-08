

const Section = require("../models/Section")
const Course = require("../models/Course")

// exports.createsection = async (req, res) => {
//   try {
//     // Extract the required properties from the request body
//     const { sectionName, courseId } = req.body

//     // Validate the input
//     if (!sectionName || !courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required properties",
//       })
//     }

//     // Create a new section with the given name
//     const newSection = await Section.create({ sectionName })

//     // Add the new section to the course's content array
//     const updatedCourse = await Course.findByIdAndUpdate(
//       courseId,
//       {
//         $push: {
//           courseContent: newSection._id,
//         },
//       },
//       { new: true }
//     )
//         .populate({
//             path: "courseContent",
//             populate: {
//             path: "Subsection",
//             },
//         })
//       .exec()

//     // Return the updated course object in the response
//     res.status(200).json({
//       success: true,
//       message: "Section created successfully",
//       updatedCourse,
//     })
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }


exports.createsection = async (req, res) => {
  try {
    // Extract the required properties from the request body
    const { sectionName, courseId } = req.body;

    // Validate the input
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    // Create a new section with the given name and courseId
    const newSection = await Section.create({ 
      sectionName,
      courseId // Make sure this is included
    });

    // Add the new section to the course's content array
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
    .populate({
      path: "courseContent",
      populate: {
        path: "Subsection",
      },
    })
    .exec();

    // Return the updated course object in the response
    res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error creating section:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      error: error.message,
    });
  }
};

// uodate section

exports.updateSection = async(req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Update section and get full course with populated data
    await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });
    
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "Subsection"
        }
      });

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedCourse
    });
    
  } catch (error) {
    console.error("Error updating section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}




// delete section

// Delete Section
exports.deletesection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    // Validate inputs
    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Both sectionId and courseId are required"
      });
    }

    // 1. Delete the section
    await Section.findByIdAndDelete(sectionId);

    // 2. Get updated course with populated content
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "Subsection"
        }
      })
      .exec();

    // 3. Remove the section reference from course
    updatedCourse.courseContent = updatedCourse.courseContent.filter(
      section => section._id.toString() !== sectionId
    );

    // 4. Save the updated course
    await updatedCourse.save();

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse
    });
    
  } catch (error) {
    console.error("Error deleting section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}




// exports.deletesection = async (req, res) => {
//   try {
//     const { sectionId, courseId } = req.body;

//     if (!sectionId || !courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Both sectionId and courseId are required"
//       });
//     }

//     // 1. Delete the section
//     await Section.findByIdAndDelete(sectionId);

//     // 2. Update course and get full populated data
//     const updatedCourse = await Course.findByIdAndUpdate(
//       courseId,
//       { $pull: { courseContent: sectionId } },
//       { new: true }
//     ).populate({
//       path: "courseContent",
//       populate: {
//         path: "Subsection"
//       }
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Section deleted successfully",
//       data: updatedCourse
//     });
    
//   } catch (error) {
//     console.error("Error deleting section:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// }

// exports.deletesection = async (req, res) => {
//     try {
//         const { sectionId } = req.body;

//         console.log("SECTION ID ", sectionId);
        
        
//         // 1. First verify the section exists
//         const section = await Section.findById(sectionId);
//         if (!section) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Section not found"
//             }); 
//         }

//         // 2. Delete the section
//         const deleteResult = await Section.deleteOne({ _id: sectionId });
        
//         // 3. Verify deletion was successful
//         if (deleteResult.deletedCount === 0) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Deletion command ran but no documents were deleted"
//             });
//         }

//         // 4. Remove from courses (with verification)
//         const updateResult = await Course.updateMany(
//             { courseContent: sectionId },
//             { $pull: { courseContent: sectionId } }
//         );

//         console.log(`Removed section from ${updateResult.modifiedCount} courses`);
    
//   const updateddata = await Section.findById(sectionId).populate("Subsection")

//         // 5. Return response
//         return res.status(200).json({
//             success: true,
//             message: "Section deleted successfully",
//             deletedCount: deleteResult.deletedCount,
//             coursesUpdated: updateResult,
//             updateddata:updateddata
//         });
        
//     } catch (error) {
//         console.error("Error while deleting section:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Database operation failed",
//             error: error.message
//         });
//     }
// }