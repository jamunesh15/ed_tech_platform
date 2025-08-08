

const mongoose = require('mongoose');
const mailsender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
  
 email:{
    type:String,
    required:true
 },
 otp:{
    type:String,
    required:true
 },

 createdAt:{ 
    type:Date,
    default:Date.now(),
    expires: 5*60
 }
      
})


// sending otp to email 

async function sendVerificationcode(email  , otp) {
      try {

        let response = await mailsender(email , "verification mail from Studynotion , thankyou for coming on our platform this is varification code for sign up " , otp);
        console.log("MAIL RESPONSE:  ",response);
        
        
      } catch (error) {
          console.log("error while sending mail " , error.message )   ;
          throw error; 
          
      }
}


otpSchema.pre("save" , async function(next){
        await sendVerificationcode(this.email,this.otp);
        next()
})

  module.exports  = mongoose.model("OTP" , otpSchema);
