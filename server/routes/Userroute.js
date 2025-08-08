
const express = require("express")

const router = express.Router()

const {sendotp ,signup ,login ,changePassword } = require("../controllers/Auth")


const {auth} = require("../middlewares/auth")

const {resetpasswordToken  , resetpassword } = require("../controllers/Resetpassword")

const {contactus} = require("../controllers/contactus")


  
router.post("/sendotp" ,sendotp)   
router.post("/signup" ,signup)   
router.post("/login",login) 
router.post("/changepassword" , auth , changePassword) 
router.post("/resetpasswordtoken" , resetpasswordToken) 
router.post("/resetpassword"  ,  resetpassword)  
router.post("/contactus"  , contactus )  

    
module.exports = router