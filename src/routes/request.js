const express = require("express");
const requestRouter = express.Router();
const {adminAuth} = require("../middleware/auth.js");


requestRouter.post("/sendConnectionRequest",adminAuth,async(req,res)=>{

  
    const user = req.user
   
    console.log("sending a connection request");
    res.send( user.firstName + "is login successfully");
   
   
  
  
  
  });

  module.exports ={requestRouter};