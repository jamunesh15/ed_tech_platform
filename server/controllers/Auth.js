

// OTP controller
const User = require("../models/Usermodel")
const OTP = require("../models/otp")
const otpGenrator = require("otp-generator")
const Profile = require("../models/Profilemodel")
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailsender = require("../utils/mailSender")
require("dotenv").config()


exports.sendotp = async(req,res)=>{
    try {
     
        // fethc email from req body
    const {email} = req.body;
  

    // email validation
    // Simple email format validation
if (!email || !email.includes('@') || !email.includes('.') || email.length < 5) {
    return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
    });
}

    const existuser = await User.findOne({email})
     // check if user already exist
    if(existuser){
        console.log("user already exist");
        return res.status(401).json({
            success:false,
            message:"user already exist please login..."
        })
        
    }

     // valid  user
     // genrate otp
     const otp = otpGenrator.generate(6,  {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
     })
     
     console.log("otp genrated ",otp);

     // check for unique otp
     let result = await OTP.findOne({otp : otp})


     // agar otp same hua to again generate karo and check karo
     while(result){

      otp = otpGenrator.generate(6,  {
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
     })
         result = await OTP.findOne({otp : otp})
     }

     // unique otp 
     // so now entry to db

     const otppayload = {email , otp}

     const otpbody = await OTP.create(otppayload);    
     console.log(otpbody);
     


      res.status(200).json({
        success:true,
        otp,
        message:"otp generated succesfully"

      })
     

    } catch (error) {
          console.log(error.message);

          return res.status(500).json({
            success:false,
            message:error.message
          })
          
    }
}


// sign up controller

exports.signup = async (req, res) => {
    try { 
        // Destructure fields from the request body
        const {
                firstname,
                lastname,
                email,
                password,
                confirmpassword, 
                accountType,
                contactNumber,
                otp,   
        } = req.body;
        // Check if All Details are there or not
        if (
            !firstname ||
            !lastname ||
            !email ||
            !password ||
            !confirmpassword ||
            !otp
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
        // Check if password and confirm password match
        if (password !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not match. Please try again.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        // Find the most recent OTP for the email
       const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response);
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "These  OTP is not valid",
            });
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const user = await User.create({
            firstname,
            lastname,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved:accountType  === "Instructor" ? false : true,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
        });

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};



// login controller

exports.login = async(req,res)=>{
  try {
    console.log("Login attempt with:", req.body); // Log incoming request
    
    const {email, password} = req.body

    if(!email || !password){
      console.log("All fields are required");
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    // Check if user exists
    const user = await User.findOne({email}).select("+password"); // Make sure password is included
    console.log("Found user:", user); // Log the found user

    if(!user){
      console.log("User doesn't exist");
      return res.status(400).json({
        success:false,
        message:"Signup first"
      })
    }

    // Compare password
    console.log("Comparing passwords...");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);
    
    if(!isPasswordValid){
      console.log("Invalid password");
      return res.status(401).json({
        success:false,
        message:"Invalid credentials"
      })
    }

    // Password is valid - generate token
    console.log("Generating token...");
    const token = jwt.sign(
      {
        email:user.email,
        id:user._id,
        accountType:user.accountType
      }, 
      process.env.JWT_SECRET, 
      {
        expiresIn:"10d"
      }
    );
    console.log("Token generated:", token);

    // Prepare response
    user.password = undefined;
    const responseuser = user.toObject();

    // Set cookie
    const options = {
      expires: new Date(Date.now() + 10*24*60*60*1000),
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    }

    console.log("Sending success response");
    return res.cookie("token", token, options).status(200).json({
      success:true,
      responseuser,
      token,
      message:"Logged in successfully"
    }) 

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success:false,
      message: error.message || "Cannot login at this time"
    })
  }
}



// change password

exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Get old password and new password from req.body
    const { currentPassword, newPassword } = req.body;

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both old password and new password are required"
      });
    }

    // Validate new password length (minimum 6 characters)
    // if (newPassword.length < 6) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "New password must be at least 6 characters long"
    //   });
    // }

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The current password is incorrect"
      });
    }

    // Check if new password is same as old password
    if (newPassword === currentPassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as current password"
      });
    }

    // Hash the new password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailsender(
        updatedUserDetails.email,
        "Password Updated Successfully",
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Updated Successfully</h2>
          <p>Hello ${updatedUserDetails.firstname || 'User'},</p>
          <p>Your password has been updated successfully.</p>
          <p>If you did not make this change, please contact our support team immediately.</p>
          <p>Best regards,<br>Your Security Team</p>
        </div>
        `
      );
      console.log("Password update email sent successfully:", emailResponse);
    } catch (error) {
      // Log email error but don't fail the password update
      console.error("Error occurred while sending email:", error);
      // You can choose to return error or continue
      // For now, we'll continue since password was updated successfully
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message
    });
  }
};