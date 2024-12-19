const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const {adminAuth} = require("../middleware/auth.js");
const {validateEditProfile}= require("../utils/validation.js")




profileRouter.get("/profile/view",adminAuth,async(req,res)=>{
    try{
  
    res.send(req.user);
  
    }catch(err){
      res.status(400).send("ERROR:"+ err.message); 
    }
  
  });

profileRouter.patch("/profile/edit", adminAuth,async(req,res)=>{
try{
  validateEditProfile(req);
 
const loggedInUser = req.user;
Object.keys(req.body).forEach((key) => (loggedInUser[key]= req.body[key]) );
 
await loggedInUser.save();

res.status(200).json(`${loggedInUser.firstName} ,is updated successfully`);
  
}catch(error){
  res.status(404).send("ERROR:"+ error.message);
}
});

profileRouter.patch("/profile/forgotPassword",adminAuth,async(req,res)=>{
try{

 
const existingPassword = req.user.password;
console.log(existingPassword);

   
const newPassword = req.body.password;
if(!newPassword || newPassword.length>10){
  throw new Error("password is not valid!")
}

const hashedNewPassword = await bcrypt.hash(newPassword, 10); 

console.log("Updated Hashed Password:", hashedNewPassword);
req.user.password = hashedNewPassword;
await req.user.save();




res.status(200).send("Password updated successfully.");
}catch(error){
  res.status(404).send("ERROR:"+ error.message);
}




})





  module.exports = {profileRouter};
  