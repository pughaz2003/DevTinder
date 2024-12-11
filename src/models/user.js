const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

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
       required:true,
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
       type: String,
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

userSchema.methods.getJWT = async function(){

const user = this;
const token = await jwt.sign({ _id: user._id }, 'godfather543',{ expiresIn: '1h' });

return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){

const user = this;
const hashedPassword = user.password;
   const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashedPassword);

return isPasswordValid;
}



module.exports = mongoose.model('User',userSchema);