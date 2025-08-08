
const express = require("express")

const router = express.Router()


// admin routes
const {createCategory} = require("../controllers/Category")
const {auth , isAdmin  ,isInstructor, isStudent} = require("../middlewares/auth")


// all accessible route
const {showAllCategories  , categoryPageDetails } = require("../controllers/Category")

// course route
const {createCourse , getAllCourses  ,getallcoursedetails ,  getFullCourseDetails , editCourse , getInstructorCourses ,deleteCourse  } = require("../controllers/Coursecontroller")
const {createsection , deletesection} = require("../controllers/Sectioncontroller")

const {createsubsection , updatesubsection , deletesubsection }  = require("../controllers/subsectioncontroller")

const {updateSection } = require("../controllers/Sectioncontroller")

const {createratingandreview , getavgrating , getallratings } = require("../controllers/ratingandreviews")

const {updateCourseProgress , getProgressPercentage } = require("../controllers/courseProgress")

// Course Details
router.post("/getCourseDetails", getallcoursedetails)

// admin routes
router.post("/createCategory" , auth , isAdmin , createCategory)
router.get("/showAllCategories" , showAllCategories)  
router.post("/categoryPageDetails"  , categoryPageDetails )





// instructor routes
router.post("/createCourse" , auth ,  isInstructor , createCourse)
router.post("/createsection" , auth , isInstructor ,  createsection)
router.post("/editCourse" ,auth , isInstructor , editCourse)
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/getFullCourseDetails" ,auth , getFullCourseDetails)  // Removed isInstructor - both students and instructors need access



router.post("/updateSection" , auth , isInstructor , updateSection)
router.post("/deletesection" , auth , isInstructor , deletesection)

// subsection
router.post("/createsubsection" , auth , isInstructor , createsubsection)
router.post("/updatesubsection" , auth , isInstructor , updatesubsection)
router.post("/deletesubsection" , auth , isInstructor , deletesubsection)


// rating and review
router.post("/createratingandreview" , auth , isStudent ,  createratingandreview)
router.get("/getavgrating" , getavgrating);

  
// instructor course
router.get("/getInstructorCourses", auth , isInstructor , getInstructorCourses)
   
 
// normal routes
router.get("/getAllCourses" ,getAllCourses)
router.get("/getallcoursedetails" , getallcoursedetails)

// progress
router.post("/updateCourseProgress" , auth , isStudent , updateCourseProgress)
router.get("/getProgressPercentage" , auth , isStudent , getProgressPercentage)

router.get("/getallratings", getallratings)

module.exports = router