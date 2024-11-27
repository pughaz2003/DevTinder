const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    firstName :
    {
       type: String,
       required: true,
       minLength:5,
       
    },
    lastName :
    {
       type: String,
    },
    emailId :
    {
      type:String,
      required:true,
      index:true,
      unique: true,
      lowercase:true,
      trim:true,
    },
    password:
    {
       type: Number,
       required:true,
    },
    age:{
       type: Number,
       min:18,
    },
    gender:{
      type:String,
      validate(value){
         const allowedGender = ['male','female','others'];
        if(!allowedGender.includes(value)) {
    throw new Error("Invalid gender. Allowed values are 'male', 'female', or 'others'.");
        }
      }
      
    },
   about:{
      type:String,
      default:"remind in all data",

   }
})

module.exports = mongoose.model('User',userSchema);