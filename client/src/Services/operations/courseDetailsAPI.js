import { toast } from "react-hot-toast"

import { updateCompletedLectures } from "../../redux/viewCourseSlice"
// import { setLoading } from "../../slices/profileSlice";
import { apiconnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiconnector("GET", GET_ALL_COURSE_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_COURSE_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiconnector("POST", COURSE_DETAILS_API, {
      courseid: courseId,
    })
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not fetch course details")
    }
    result = response.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// fetching the available course categories
export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiconnector("GET", COURSE_CATEGORIES_API)
    console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

// add the course details
export const addCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
    toast.success("Course Details Added Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// edit the course details
export const editCourseDetails = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// create a section
// export const createSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", CREATE_SECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("CREATE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Create Section")
//     }
//     toast.success("Course Section Created")
//     result = response?.data?.updatedCourse
//   } catch (error) {
//     console.log("CREATE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector("POST", CREATE_SECTION_API, {
      sectionName: data.sectionName,
      courseId: data.courseId // Ensure courseId is included
    }, {
      Authorization: `Bearer ${token}`,
    });
    
    console.log("CREATE SECTION API RESPONSE............", response);
    
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Create Section");
    }
    
    toast.success("Course Section Created");
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.error("CREATE SECTION API ERROR............", error);
    toast.error(error.response?.data?.message || error.message || "Failed to create section");
  }
  toast.dismiss(toastId);
  return result;
};

// create a subsection
// export const createsection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", CREATE_SECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("CREATE SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Create Section")
//     }
//     toast.success("Course Section Created")
//     result = response?.data?.updatedCourse
//   } catch (error) {
//     console.log("CREATE SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// create subsection
export const createSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", CREATE_SUBSECTION_API, data, {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could Not Add Lecture")
    }
    toast.success("Lecture Added Successfully")
    // Return the entire response data, which includes both the section and its subsections
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    // Use the error message from the response if available
    toast.error(error?.response?.data?.message || error.message || "Failed to add lecture")
    throw error // Re-throw the error to be handled by the component
  } finally {
    toast.dismiss(toastId)
  }
  return result
}

// update a section
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// update a subsection
// export const updateSubSection = async (data, token) => {
//   let result = null
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("POST", UPDATE_SUBSECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("UPDATE SUB-SECTION API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Update Lecture")
//     }
//     toast.success("Lecture Updated")
//     result = response?.data?.data
//   } catch (error) {
//     console.log("UPDATE SUB-SECTION API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }

// delete a section
// export const deleteSection = async (data, token) => {
//   const toastId = toast.loading("Loading...");
//   try {
//     const response = await apiconnector("DELETE", DELETE_SECTION_API, data, {
//       Authorization: `Bearer ${token}`,
//     });
    
//     if (!response?.data?.success) {
//       throw new Error(response?.data?.message || "Could Not Delete Section");
//     }
    
//     toast.success("Section deleted successfully");
//     return response.data; // Return the full response data
//   } catch (error) {
//     console.error("DELETE SECTION API ERROR:", error);
//     toast.error(error.message);
//     throw error; // Re-throw the error for handling in the component
//   } finally {
//     toast.dismiss(toastId);
//   }
// };


// export const createSubSection = async (data, token) => {
//   let result = null;
//   const toastId = toast.loading("Processing...");
  
//   try {
//     // Validate required fields
//     if (!data.get("sectionId") || !data.get("title") || !data.get("description") || !data.get("video")) {
//       throw new Error("All fields including video are required");
//     }

//     const response = await apiconnector(
//       "POST", 
//       CREATE_SUBSECTION_API, 
//       data, 
//       {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     console.log("CREATE SUB-SECTION API RESPONSE:", response);

//     if (!response?.data?.success) {
//       throw new Error(response?.data?.message || "Failed to create lecture");
//     }

//     toast.success("Lecture added successfully");
//     result = response.data;
//   } catch (error) {
//     console.error("CREATE SUB-SECTION API ERROR:", {
//       message: error.message,
//       response: error.response?.data,
//       stack: error.stack
//     });
//     toast.error(error.response?.data?.message || error.message || "Failed to add lecture");
//   } finally {
//     toast.dismiss(toastId);
//   }
//   return result;
// };

export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Processing...");
  
  try {
    // Validate required fields
    const requiredFields = ["sectionId", "subSectionId", "courseId", "title", "description"];
    for (let field of requiredFields) {
      if (!data.get(field)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Log request details
    console.log("UPDATE SUBSECTION REQUEST:");
    console.log("Endpoint:", UPDATE_SUBSECTION_API);
    console.log("Headers:", {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    
    // Log FormData contents
    console.log("Request Data:");
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value instanceof File ? 'File: ' + value.name : value}`);
    }

    const response = await apiconnector(
      "POST", 
      UPDATE_SUBSECTION_API, 
      data, 
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("UPDATE SUB-SECTION API RESPONSE:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Failed to update lecture");
    }

    toast.success("Lecture updated successfully");
    result = response?.data?.data;
  } catch (error) {
    console.error("UPDATE SUB-SECTION API ERROR:", {
      name: error.name,
      message: error.message,
      response: {
        data: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      },
      request: error.request,
      config: error.config
    });
    
    const errorMessage = error.response?.data?.message || error.message || "Failed to update lecture";
    toast.error(errorMessage);
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

// fetching all courses under a specific instructor
// export const fetchInstructorCourses = async (token) => {
//   let result = []
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector(
//       "GET",
//       GET_ALL_INSTRUCTOR_COURSES_API,
//       null,
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     )
//     console.log("INSTRUCTOR COURSES API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch Instructor Courses")
//     }
//     result = response?.data?.data
//   } catch (error) {
//     console.log("INSTRUCTOR COURSES API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
//   return result
// }


export const fetchInstructorCourses = async (token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    
    // Return consistent structure
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    console.error("INSTRUCTOR COURSES API ERROR:", error);
    toast.error(error.message);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  } finally {
    toast.dismiss(toastId);
  }
};

// delete a course
// export const deleteCourse = async (data, token) => {
//   const toastId = toast.loading("Loading...")
//   try {
//     const response = await apiconnector("DELETE", DELETE_COURSE_API, data, {
//       Authorization: `Bearer ${token}`,
//     })
//     console.log("DELETE COURSE API RESPONSE............", response)
//     if (!response?.data?.success) {
//       throw new Error("Could Not Delete Course")
//     }
//     toast.success("Course Deleted")
//   } catch (error) {
//     console.log("DELETE COURSE API ERROR............", error)
//     toast.error(error.message)
//   }
//   toast.dismiss(toastId)
// }



export const deleteCourse = async (courseId, token) => {
  const toastId = toast.loading("Deleting course...");
  try {
    // Validate course ID
    if (!courseId || !/^[0-9a-fA-F]{24}$/.test(courseId)) {
      throw new Error("Invalid course ID format");
    }

    const response = await apiconnector(
      "DELETE",
      DELETE_COURSE_API,
      { courseId }, // Send as request body
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to delete course");
    }

    toast.success("Course deleted successfully");
    return response.data;
  } catch (error) {
    console.error("DELETE COURSE ERROR:", error);
    toast.error(error.message);
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// export const deleteCourse = async (courseId, token) => {
//   const toastId = toast.loading("Deleting course...");
  
//   try {
//     // Validate courseId before making the request
//     if (!courseId || typeof courseId !== "string") {
//       throw new Error("Invalid course ID provided");
//     }

//     console.log("Attempting to delete course with ID:", courseId); // Debug log

//     const response = await apiconnector(
//       "DELETE",
//       DELETE_COURSE_API,
//       { courseId }, // Proper payload structure
//       {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       }
//     );

//     console.log("Delete course response:", response); // Debug log

//     if (!response.data?.success) {
//       throw new Error(response.data?.message || "Failed to delete course");
//     }

//     toast.success("Course deleted successfully");
//     return response.data;
    
//   } catch (error) {
//     console.error("DELETE COURSE ERROR:", error);
    
//     // Handle specific error cases
//     let errorMessage = error.message;
//     if (error.response) {
//       // Server responded with error status
//       errorMessage = error.response.data?.message || error.message;
      
//       if (error.response.status === 404) {
//         errorMessage = "Course not found";
//       } else if (error.response.status === 403) {
//         errorMessage = "You don't have permission to delete this course";
//       }
//     }

//     toast.error(errorMessage);
//     throw error; // Re-throw for component to handle
    
//   } finally {
//     toast.dismiss(toastId);
//   }
// };


// In courseDetailsAPI.js
// export const deleteCourse = async (courseId, token) => {
//   const toastId = toast.loading("Deleting course...");
//   try {
//     const response = await apiconnector(
//       "DELETE", 
//       DELETE_COURSE_API,
//       { courseId }, // Send as object property
//       {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     );
    
//     console.log("DELETE RESPONSE:", response);
    
//     if (!response.data?.success) {
//       throw new Error(response.data?.message || "Could not delete course");
//     }
//     toast.success("Course deleted successfully");
//     return response.data;
//   } catch (error) {
//     console.error("DELETE ERROR:", error);
//     toast.error(error.response?.data?.message || error.message);
//     throw error;
//   } finally {
//     toast.dismiss(toastId);
//   }
// };

// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiconnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)
    console.log("Course Details API - Raw response data:", JSON.stringify(response.data, null, 2));

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
    console.log("Course Details API - Final result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    )

    if (!response.data.success) {
      throw new Error(response.data.message || response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
    toast.error(error.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiconnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return success
}


