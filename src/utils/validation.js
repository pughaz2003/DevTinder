const validator = require('validator');
 
 
 const validateSignup  = (req) =>{

    const {firstName,lastName,emailId,password} = req.body;

  if(!firstName || !lastName){
    throw new Error("enter the valid details");
  }else if(!validator.isEmail(emailId)){
    throw new Error("invalid  email credentials");
  }else if(!validator.isStrongPassword(password)){
    throw new Error("invalid password credentials");
  }
}

const validateEditProfile = (req) =>{
   const allowedUpdates = [
  "firstName",
  "lastName",
  "emailId",
  "age",
  "gender" ,
  "skills" ,
  "about"
   ]

  const allowedEditFields = Object.keys(req.body).every(fields =>  allowedUpdates.includes(fields) );

  if(!allowedEditFields){
    throw new Error("invalid credentials!!!")
  }

return allowedEditFields;



}






 module.exports ={
    validateSignup,validateEditProfile
 }






