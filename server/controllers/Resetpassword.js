
const User = require("../models/Usermodel")

const mailsender = require("../utils/mailSender")
const bcrypt = require("bcrypt")

// reset Password token

exports.resetpasswordToken = async(req,res)=>{

 try {

    // 1  get email from request
    const {email}  = req.body
 
    //2 check user for this email and email validation
    
    const userexist = await User.findOne({email})

    if(!userexist){
        console.log("user does not exist please signup first");
          return res.status(400).json({
            success:false,
            message:"Your email is not registered with us"
          })    
    }

    // user exist

    //3 generate token
    const token  = crypto.randomUUID();


    //4  update user by passing token and expire time
   const updatedDetails   = await User.findOneAndUpdate({email : email},

     // passtoken with expiretime
     {
        token:token,
        resetpasswordExpire: Date.now() + 5*60*1000
     },
     {new:true}

   )


    //5  create url for frontned
    const url = `http://localhost:5173/resetpassword/${token}`;

    //6  send mail that contain frontend url for reset password 
    await mailsender(email , 
                       "Password reset Link ",
                       `click here to reset your password : ${url}`
    ) 
   

    //7  return response
res.status(200).json({
    success:true,
    message:"Reset mail send successfully"
})
    
 } catch (error) {
    console.log("Error while reseting your  password ",error.message);
    
      return res.status(500).json({
        success:false,
        message:"Error while reseting your password"
      })
 }

}



// reset password
 exports.resetpassword = async(req,res)=>{

try {

    // 1 fetch data from req body
   const {password , confirmpassword , token} = req.body


    // 2 validation
   if(password !== confirmpassword){
    return res.status(400).json({
        success:false,
        message:"password and confirm password not matched"
    })
   }


    // 3 get userdetails form db using token
    const userDetails = await  User.findOne({
        token:token
    })
    // 4 if no entry return res

    if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"Token is invalid"
        })
    }

    // token time check
    if(userDetails.resetpasswordExpire < Date.now()){
        return res.status(400).json({
            success:false,
            message:"Token is expired"
        })
    }

    // 5 hash password

    let hashpassword = await bcrypt.hash(password , 10);



    // 6 update user
    const upadatesuser = await User.findOneAndUpdate(
        {token:token},
        {password:hashpassword},
        {new:true}   
    )

    // 7 return response
 return   res.status(200).json({
        success:true,
        message:"password reset successfully",
         user: upadatesuser
    })
    
} catch (error) {
      console.log("Something went wrong by reseting your password" , error.message);
        return res.status(500).json({
            success:false,
            message:"something went wrong by reseting password"
        })
}

 }