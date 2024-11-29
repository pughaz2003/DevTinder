const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
   
    firstName :
    {
       type: String,
       required: true,
       minLength:5,
       maxLength:10,
       
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
      validate(value){
        if(!validator.isEmail(value)){
         throw new  Error("invalid email address:"+ value)
        }
      }
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

   },
   skills:{
      type:[String]

   }
})

module.exports = mongoose.model('User',userSchema);