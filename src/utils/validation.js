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

 module.exports ={
    validateSignup,
 }






