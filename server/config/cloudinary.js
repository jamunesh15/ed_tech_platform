
const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect = ()=>{
    try{

        // cloudinary requires 3 things :    name , apikey , secret key

        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET
        })

    }
    catch(error){
   console.log(error);

   
    } 
}