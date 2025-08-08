

const mongoose = require('mongoose')
require("dotenv").config()

const dbconnection = ()=>{

    
  mongoose.connect(process.env.DATABASE_URL)
  .then(()=>{
    console.log("connection with db succesfull");
    
  })
  .catch((error)=>{
    console.log("cannot connect with db  " , error.message);
    process.exit(1)
  }
)
 

}
   
module.exports = dbconnection