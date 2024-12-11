const User = require("../models/user")
const jwt = require('jsonwebtoken');

const adminAuth =async(req,res,next)=> {
try{
  const cookie = req.cookies; 

  const {token} = cookie;
if(!token){
throw new Error("invalid token details!!!!!");
}
const decodedObj = await jwt.verify(token,"godfather543")
const {_id} = decodedObj;


const user = await User.findById(_id);
if(!user){
  throw new Error("user is not exist");
  }
req.user = user;
next();
}catch(err){
  res.status(404).send("ERROR:" +err);
}


  };

  module.exports = {
    adminAuth,
  }