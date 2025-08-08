const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/Usermodel");
const { uploadImagetocloudinary } = require("../utils/imageUpload");
const { default: mongoose } = require("mongoose");
const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const Courseprogress = require("../models/Courseprogress");
const mailSender = require("../utils/mailSender");





// Create a new course
exports.createCourse = async (req, res) => {
  try {
    console.log("[SERVER] ======= CREATE COURSE DEBUG =======");
    console.log("[SERVER] Create course request received");
    console.log("[SERVER] Request body:", Object.keys(req.body));
    console.log("[SERVER] Request files:", req.files ? Object.keys(req.files) : "No files");
    console.log("[SERVER] Body content:", {
      courseName: req.body.courseName,
      courseDescription: req.body.courseDescription,
      price: req.body.price,
      tag: req.body.tag,
      category: req.body.category,
      whatYouWillLearn: req.body.whatYouWillLearn,
      instructions: req.body.instructions,
      status: req.body.status
    });
    
    if (req.files?.thumbnailImage) {
      console.log("[SERVER] Thumbnail file details:", {
        name: req.files.thumbnailImage.name,
        size: req.files.thumbnailImage.size,
        type: req.files.thumbnailImage.mimetype,
        tempFilePath: req.files.thumbnailImage.tempFilePath
      });
    } else {
      console.log("[SERVER] ❌ No thumbnail file in req.files");
    }
    
    console.log("[SERVER] Existing thumbnail:", req.body?.existingThumbnail);
    console.log("[SERVER] ========================================");

    // Get user ID from request object
    const userId = req.user.id;

    // Get all required fields from request body
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    // Validation checks
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !tag.length ||
      !category ||
      !instructions ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    // Get thumbnail image from request files or existing thumbnail
    const thumbnail = req.files?.thumbnailImage;
    const existingThumbnail = req.body?.existingThumbnail;
    
    if (!thumbnail && !existingThumbnail) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail is required",
      });
    }

    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails || instructorDetails.accountType !== "Instructor") {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Check if the category is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    // Upload the Thumbnail to Cloudinary or use existing thumbnail
    let thumbnailUrl;
    if (thumbnail) {
      // New file upload
      const thumbnailImage = await uploadImagetocloudinary(
        thumbnail,
        process.env.FOLDER_NAME,
        { width: 1024, height: 576 }
      );
      thumbnailUrl = thumbnailImage.secure_url;
    } else {
      // Use existing thumbnail URL
      thumbnailUrl = existingThumbnail;
    }

    // Create a new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: Array.isArray(tag) ? tag : JSON.parse(tag),
      category: categoryDetails._id,
      thumbnail: thumbnailUrl,
      status: status || "Draft",
      instructions: Array.isArray(instructions) ? instructions : JSON.parse(instructions),
    });

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // Add the new course to the Category
    await Category.findByIdAndUpdate(
      category,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

     // sending mail to instructor that course has been created
      try {
        await mailSender(
          instructorDetails.email,
          "Course Created Successfully",
          `Your course "${courseName}" has been created successfully!`
        );
        console.log("[SERVER] Course creation email sent successfully to:", instructorDetails.email);
      } catch (emailError) {
        console.error("[SERVER] Failed to send course creation email:", emailError);
        // Don't fail the entire course creation if email fails
      }

    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
};

//getCourseDetails

exports.getallcoursedetails = async (req, res) => {
    try {
        const { courseid } = req.body;
        
        // Validate input
        if (!courseid) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }

        // Check if valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseid)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID format"
            });
        }

        // Find course details with all necessary populates
        const courseDetails = await Course.findOne({ _id: courseid })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "Subsection"
                }
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate("totalStudent", "firstName lastName email")
            .exec();

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course details not found"
            }); 
        }

        // console.log("COURSE DETAILS:", courseDetails);
        
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: {
                courseDetails: courseDetails
            }
        });
 
    } catch (error) {
        console.error("Error fetching course details:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


exports.editCourse = async (req, res) => {
  try {
    const { courseId, ...updates } = req.body; // Destructure courseId and collect the rest as updates
    
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // Handle thumbnail update
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImagetocloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Convert updates to a plain object if it's from FormData
    const updatesObj = typeof updates === 'object' ? updates : JSON.parse(JSON.stringify(updates));

    // Update fields
    Object.keys(updatesObj).forEach(key => {
      if (key === "tag" || key === "instructions") {
        try {
          course[key] = typeof updatesObj[key] === 'string' ? 
            JSON.parse(updatesObj[key]) : 
            updatesObj[key];
        } catch (error) {
          console.error(`Error parsing ${key}:`, error);
          course[key] = updatesObj[key];
        }
      } else {
        course[key] = updatesObj[key];
      }
    });

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
    .populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    })
    .populate("category")
    .populate("ratingAndReviews")
    .populate({
      path: "courseContent",
      populate: {
        path: "Subsection",
      },
    })
    .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}




// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}




// Delete the Course
  // exports.deleteCourse = async (req, res) => {
  //   try {
  //     const { courseId } = req.body

  //     // Find the course
  //     const course = await Course.findById(courseId)
  //     if (!course) {
  //       return res.status(404).json({ message: "Course not found" })
  //     }

  //     // Unenroll students from the course
  //     const studentsEnrolled = course.studentsEnrolled
  //     for (const studentId of studentsEnrolled) {
  //       await User.findByIdAndUpdate(studentId, {
  //         $pull: { courses: courseId },
  //       })
  //     }

  //     // Delete sections and sub-sections
  //     const courseSections = course.courseContent
  //     for (const sectionId of courseSections) {
  //       // Delete sub-sections of the section
  //       const section = await Section.findById(sectionId)
  //       if (section) {
  //         const subSections = section.Subsection
  //         for (const subSectionId of subSections) {
  //           await Subsection.findByIdAndDelete(subSectionId)
  //         }
  //       }

  //       // Delete the section
  //       await Section.findByIdAndDelete(sectionId)
  //     }

  //     // Delete the course
  //     await Course.findByIdAndDelete(courseId)

  //     return res.status(200).json({
  //       success: true,
  //       message: "Course deleted successfully",
  //     })
  //   } catch (error) {
  //     console.error(error)
  //     return res.status(500).json({
  //       success: false,
  //       message: "Server error",
  //       error: error.message,
  //     })
  //   }
  // }


  exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Validate course ID
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid course ID format" 
      });
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: "Course not found" 
      });
    }

    // Verify instructor owns the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this course"
      });
    }

    // Delete sections and sub-sections
    for (const sectionId of course.courseContent) {
      const section = await Section.findById(sectionId);
      if (section) {
        await Subsection.deleteMany({ _id: { $in: section.Subsection } });
        await Section.findByIdAndDelete(sectionId);
      }
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "Subsection",
        },
      })
      .exec()

    let courseProgressCount = await Courseprogress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.Subsection.forEach((Subsection) => {
        const timeDurationInSeconds = parseInt(Subsection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    // const totalDuration = (totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        // totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}