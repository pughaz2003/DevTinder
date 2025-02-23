const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const  {validateSignup} = require("../utils/validation.js");

authRouter.post('/signup', async (req,res) => {
    try{
     const {firstName,lastName,emailId,password,photoUrl} = req.body;
   
     const hashedPassword = await bcrypt.hash(password, 10);
     
    
   
   
     const user = new User({
       firstName,
       lastName,
       emailId,
       photoUrl,
       password:hashedPassword  
     });
     await validateSignup(req);
     
     await user.save();
     res.send('user added successfully');
     
   }catch(err){
     res.status(400).send("ERROR:"+ err.message);
   }
   });


   authRouter.post("/login",async (req,res)=>{
    try{
     const {emailId,password}=req.body;
  
  
      const user = await User.findOne({emailId:emailId});
     if(!user) {
     throw new Error("invalid credential")
     }
  
   const isPasswordValid = await user.validatePassword(password);
    
   
    if(isPasswordValid){
  
      const token = await user.getJWT();
      
  
      // Set the token in a cookie
      res.cookie("token", token,{
        expiresIn: '1h' 
      }); 
   
      res.send(user)
    }else{
     
      throw new Error("invalid credentials!!!!!!!!");
    }
  
    }catch(err){
      res.status(400).send("ERROR:"+ err.message); 
    }
  });
  
authRouter.post("/logout",(req,res)=>{

  
res.cookie("token",null,{expiresIn:new Date(Date.now())});

res.status(200).json( "Logged out successfully");

})



  module.exports = {authRouter};