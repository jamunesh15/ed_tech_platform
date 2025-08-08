
const express = require("express")


const router = express.Router()

const {auth, isInstructor} = require("../middlewares/auth")
const {updateDisplayPicture , updateProfile ,getAllUserDetails , getEnrolledCourses } = require("../controllers/Profilecontroller")

const {deleteAccount ,instrctordashboard } = require("../controllers/Profilecontroller")
  
router.put("/updateDisplayPicture", auth , updateDisplayPicture)
router.put("/updateprofile" , auth , updateProfile)
router.get("/getAllUserDetails" , auth ,getAllUserDetails)
router.delete("/deleteprofile" , auth , deleteAccount)
router.get("/getEnrolledCourses" , auth ,  getEnrolledCourses)
router.get("/instrctordashboard" , auth , isInstructor , instrctordashboard)

module.exports = router  