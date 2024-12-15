const express = require("express");
const profileRouter = express.Router();
const {adminAuth} = require("../middleware/auth.js");



profileRouter.get("/profile",adminAuth,async(req,res)=>{
    try{
  
    res.send(req.user);
  
    }catch(err){
      res.status(400).send("ERROR:"+ err.message); 
    }
  
  });

  module.exports = {profileRouter};
  ;